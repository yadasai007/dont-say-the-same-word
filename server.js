// Don't Say the Same Word — online server.
// Rooms live in memory. The server owns the game state and sends each player
// only what they are allowed to see (the secret word stays with the host until the reveal).

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const express = require('express');
const { Server } = require('socket.io');

const PORT = process.env.PORT || process.argv[2] || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const LEARNED_FILE = process.env.LEARNED_FILE || path.join(DATA_DIR, 'learned.json');

const MAX_PLAYERS = 8;
const TURN_SECONDS = 60;
const MIN_PLAYERS = { human: 3, computer: 1 };
const OWNER_GRACE_MS = 20_000;          // wait before handing the room to someone else
const ROOM_IDLE_MS = 30 * 60_000;       // drop rooms nobody has been connected to for this long
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // no I or O

// ---------- question pool ----------
// Entry: { q, groups: [[word, alias, ...], ...] }. Words in one group count as the same answer.
const norm = s => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
const POOL = new Map();
let learned = {};
let builtInQuestions = 0;
let builtInWords = 0;

function mergeGroup(entry, words) {
  const add = words.map(w => String(w).trim()).filter(Boolean);
  if (!add.length) return;
  const keys = new Set(add.map(norm));
  const hits = entry.groups.filter(g => g.some(w => keys.has(norm(w))));
  const merged = [];
  for (const w of [...hits.flat(), ...add]) if (!merged.some(m => norm(m) === norm(w))) merged.push(w);
  entry.groups = entry.groups.filter(g => !hits.includes(g));
  entry.groups.push(merged);
}

function addToPool(target, q, groups) {
  const key = norm(q);
  let e = target.get ? target.get(key) : target[key];
  if (!e) {
    e = { q: q.trim(), groups: [] };
    if (target.set) target.set(key, e); else target[key] = e;
  }
  groups.forEach(g => mergeGroup(e, g));
  return e;
}

function countWords() {
  let n = 0;
  for (const e of POOL.values()) for (const g of e.groups) n += g.length;
  return n;
}

function loadPool() {
  const files = fs.readdirSync(DATA_DIR).filter(f => /^questions-\d+\.js$/.test(f)).sort();
  for (const f of files) {
    const src = fs.readFileSync(path.join(DATA_DIR, f), 'utf8');
    const body = (src.match(/`([\s\S]*)`/) || [])[1] || '';
    for (const line of body.split('\n')) {
      const [q, a] = line.split('|');
      if (!q || !a || !q.trim()) continue;
      addToPool(POOL, q, a.split(';').map(g => g.split('=')));
    }
  }
  builtInQuestions = POOL.size;
  builtInWords = countWords();
  try { learned = JSON.parse(fs.readFileSync(LEARNED_FILE, 'utf8')) || {}; } catch { learned = {}; }
  for (const k in learned) addToPool(POOL, learned[k].q, learned[k].groups);
  console.log(`Pool loaded: ${POOL.size} questions, ${countWords()} answers (${Object.keys(learned).length} learned)`);
}

let saveTimer = null;
function saveLearned() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFile(LEARNED_FILE, JSON.stringify(learned), err => {
      if (err) console.error('Could not save learned answers:', err.message);
    });
  }, 1000);
}

function poolStats() {
  return {
    questions: POOL.size,
    answers: countWords(),
    learnedQuestions: POOL.size - builtInQuestions,
    learnedAnswers: countWords() - builtInWords,
  };
}

// ---------- rooms ----------
const rooms = new Map();

const id = (n = 8) => crypto.randomBytes(n).toString('hex');
function newCode() {
  for (;;) {
    let c = '';
    for (let i = 0; i < 4; i++) c += CODE_ALPHABET[crypto.randomInt(CODE_ALPHABET.length)];
    if (!rooms.has(c)) return c;
  }
}
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, max);

function createRoom() {
  const room = {
    code: newCode(),
    ownerId: null,
    settings: { mode: 'human', startScore: 5 },
    players: [],            // { id, token, name, score, connected, socketId }
    phase: 'lobby',         // lobby | hostPicking | answering | judging | results | gameOver
    round: 0,
    hostId: null,
    category: '',
    word: '',
    wordGroup: [],
    answers: {},            // playerId -> text
    decisions: {},          // playerId -> 'same' | 'diff'
    answerers: [],          // playerIds expected to answer this round
    deadline: 0,
    timer: null,
    usedKeys: [],
    lastDeltas: {},
    lastLearned: '',
    notice: '',
    lastActive: Date.now(),
    ownerTimer: null,
  };
  rooms.set(room.code, room);
  return room;
}

const isCPU = room => room.settings.mode === 'computer';
const findPlayer = (room, pid) => room.players.find(p => p.id === pid);
const alive = room => room.players.filter(p => p.score > 0);

function addPlayer(room, name, socket) {
  const p = { id: id(4), token: id(16), name, score: room.settings.startScore, connected: true, socketId: socket.id };
  room.players.push(p);
  if (!room.ownerId) room.ownerId = p.id;
  attach(room, p, socket);
  return p;
}

function attach(room, p, socket) {
  p.connected = true;
  p.socketId = socket.id;
  socket.data.code = room.code;
  socket.data.pid = p.id;
  socket.join(room.code);
  room.lastActive = Date.now();
  if (room.ownerId === p.id) clearTimeout(room.ownerTimer);
}

function canJudge(room, pid) {
  return isCPU(room) ? pid === room.ownerId : pid === room.hostId;
}

// What one player is allowed to see.
function viewFor(room, p) {
  const reveal = room.phase === 'judging' || room.phase === 'results';
  const isHost = !isCPU(room) && p.id === room.hostId;
  let otherAnswers = [];
  if (reveal && isCPU(room)) {
    const e = POOL.get(norm(room.category));
    otherAnswers = e ? e.groups.filter(g => norm(g[0]) !== norm(room.word)).map(g => g[0]).slice(0, 10) : [];
  }
  return {
    serverNow: Date.now(),
    code: room.code,
    me: p.id,
    ownerId: room.ownerId,
    settings: room.settings,
    phase: room.phase,
    round: room.round,
    hostId: isCPU(room) ? null : room.hostId,
    category: room.phase === 'hostPicking' ? '' : room.category,
    word: reveal || (isHost && room.phase === 'answering') ? room.word : '',
    aliases: reveal ? room.wordGroup.slice(1) : [],
    otherAnswers,
    deadline: room.phase === 'answering' ? room.deadline : 0,
    players: room.players.map(x => ({
      id: x.id, name: x.name, score: x.score, connected: x.connected,
      answering: room.answerers.includes(x.id),
      submitted: room.answerers.includes(x.id) && x.id in room.answers,
    })),
    myAnswer: room.answers[p.id] ?? null,
    answers: reveal
      ? room.answerers.filter(pid => pid in room.answers).map(pid => ({ id: pid, text: room.answers[pid], verdict: room.decisions[pid] || null }))
      : [],
    canJudge: canJudge(room, p.id),
    lastDeltas: room.phase === 'results' || room.phase === 'gameOver' ? room.lastDeltas : {},
    lastLearned: room.phase === 'results' || room.phase === 'gameOver' ? room.lastLearned : '',
    notice: room.notice,
    pool: poolStats(),
    limits: { maxPlayers: MAX_PLAYERS, minPlayers: MIN_PLAYERS, turnSeconds: TURN_SECONDS },
  };
}

function broadcast(room) {
  for (const p of room.players) {
    if (p.connected && p.socketId) io.to(p.socketId).emit('state', viewFor(room, p));
  }
}

// ---------- game flow ----------
function startGame(room) {
  room.players.forEach(p => { p.score = room.settings.startScore; });
  room.round = 1;
  room.usedKeys = [];
  room.lastDeltas = {};
  room.hostId = room.players[0].id;
  startRound(room);
}

function nextHost(room) {
  const order = room.players;
  const start = Math.max(0, order.findIndex(p => p.id === room.hostId));
  for (let step = 1; step <= order.length; step++) {
    const cand = order[(start + step) % order.length];
    if (cand.score > 0 && cand.connected) return cand.id;
  }
  for (let step = 1; step <= order.length; step++) {
    const cand = order[(start + step) % order.length];
    if (cand.score > 0) return cand.id;
  }
  return room.hostId;
}

function resetRound(room) {
  clearTimeout(room.timer);
  room.answers = {};
  room.decisions = {};
  room.answerers = [];
  room.category = '';
  room.word = '';
  room.wordGroup = [];
  room.deadline = 0;
  room.lastLearned = '';
}

function startRound(room) {
  resetRound(room);
  room.notice = '';
  if (isCPU(room)) {
    if (!pickComputerQuestion(room)) { room.phase = 'lobby'; room.notice = 'The question pool is empty.'; return; }
    beginAnswering(room);
  } else {
    const host = findPlayer(room, room.hostId);
    if (!host || host.score <= 0) room.hostId = nextHost(room);
    room.phase = 'hostPicking';
  }
}

function pickComputerQuestion(room) {
  let keys = [...POOL.keys()].filter(k => POOL.get(k).groups.length >= 2 && !room.usedKeys.includes(k));
  if (!keys.length) { room.usedKeys = []; keys = [...POOL.keys()].filter(k => POOL.get(k).groups.length >= 2); }
  if (!keys.length) return false;
  const key = keys[crypto.randomInt(keys.length)];
  const e = POOL.get(key);
  const group = e.groups[crypto.randomInt(e.groups.length)];
  room.usedKeys.push(key);
  room.category = e.q;
  room.word = group[0];
  room.wordGroup = group.slice();
  return true;
}

function beginAnswering(room) {
  room.phase = 'answering';
  room.answers = {};
  room.decisions = {};
  room.answerers = alive(room).filter(p => isCPU(room) || p.id !== room.hostId).map(p => p.id);
  room.deadline = Date.now() + TURN_SECONDS * 1000;
  clearTimeout(room.timer);
  room.timer = setTimeout(() => { endAnswering(room); broadcast(room); }, TURN_SECONDS * 1000 + 750);
}

function allSubmitted(room) {
  return room.answerers.every(pid => pid in room.answers);
}

function endAnswering(room) {
  if (room.phase !== 'answering') return;
  clearTimeout(room.timer);
  for (const pid of room.answerers) if (!(pid in room.answers)) room.answers[pid] = '';
  room.decisions = {};
  if (isCPU(room)) {
    const same = new Set(room.wordGroup.map(norm));
    for (const pid of room.answerers) {
      const a = room.answers[pid].trim();
      if (a) room.decisions[pid] = same.has(norm(a)) ? 'same' : 'diff';
    }
  }
  room.phase = 'judging';
}

function pendingJudgements(room) {
  return room.answerers.filter(pid => room.answers[pid]?.trim() && !room.decisions[pid]).length;
}

function learnFromRound(room) {
  const same = [room.word];
  const others = [];
  for (const pid of room.answerers) {
    const a = (room.answers[pid] || '').trim();
    if (!a) continue;
    if (room.decisions[pid] === 'same') same.push(a); else others.push([a]);
  }
  const groups = [same, ...others];
  const before = countWords();
  const hadQuestion = POOL.has(norm(room.category));
  addToPool(POOL, room.category, groups);
  addToPool(learned, room.category, groups);
  saveLearned();
  const added = countWords() - before;
  const s = n => (n === 1 ? '' : 's');
  room.lastLearned = !hadQuestion
    ? `New question added to the pool with ${added} answer${s(added)}.`
    : added ? `${added} new answer${s(added)} added to the pool.` : '';
}

function applyScores(room) {
  learnFromRound(room);
  room.lastDeltas = {};
  for (const pid of room.answerers) {
    const p = findPlayer(room, pid);
    if (!p) continue;
    if (!room.answers[pid]?.trim() || room.decisions[pid] === 'same') {
      p.score = Math.max(0, p.score - 1);
      room.lastDeltas[pid] = -1;
    }
  }
  const needed = isCPU(room) ? Math.min(2, room.players.length) : 2;
  room.phase = alive(room).length < needed ? 'gameOver' : 'results';
}

function nextRound(room) {
  room.round++;
  if (!isCPU(room)) room.hostId = nextHost(room);
  startRound(room);
}

function skipRound(room, why) {
  room.notice = why || 'The round was skipped.';
  room.round++;
  if (!isCPU(room)) room.hostId = nextHost(room);
  const notice = room.notice;
  startRound(room);
  room.notice = notice;
}

function removePlayer(room, pid) {
  const p = findPlayer(room, pid);
  if (!p) return;
  room.players = room.players.filter(x => x.id !== pid);
  delete room.answers[pid];
  delete room.decisions[pid];
  room.answerers = room.answerers.filter(x => x !== pid);
  if (!room.players.length) { clearTimeout(room.timer); rooms.delete(room.code); return; }
  if (room.ownerId === pid) room.ownerId = (room.players.find(x => x.connected) || room.players[0]).id;

  const inGame = !['lobby', 'gameOver'].includes(room.phase);
  if (!inGame) return;
  const needed = isCPU(room) ? 1 : 2;
  if (alive(room).length < needed) { clearTimeout(room.timer); room.phase = 'gameOver'; return; }
  if (!isCPU(room) && room.hostId === pid) {
    room.hostId = room.players[0].id;
    skipRound(room, `${p.name} (the host) left, so the round was skipped.`);
    return;
  }
  if (room.phase === 'answering' && room.answerers.length && allSubmitted(room)) endAnswering(room);
}

function handOverOwner(room) {
  const owner = findPlayer(room, room.ownerId);
  if (owner && owner.connected) return;
  const next = room.players.find(p => p.connected);
  if (next) {
    room.ownerId = next.id;
    room.notice = `${next.name} now runs the room.`;
    broadcast(room);
  }
}

// ---------- server ----------
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/healthz', (req, res) => res.send('ok'));

const server = http.createServer(app);
const io = new Server(server, { pingInterval: 20_000, pingTimeout: 20_000 });

io.on('connection', socket => {
  const ctx = () => {
    const room = rooms.get(socket.data.code);
    const p = room && findPlayer(room, socket.data.pid);
    return p ? { room, p } : null;
  };
  // Wrap a handler so it always replies and re-broadcasts the room.
  const on = (event, fn) => socket.on(event, (payload, ack) => {
    const reply = typeof ack === 'function' ? ack : () => {};
    try {
      const res = fn(payload || {}) || { ok: true };
      reply(res);
    } catch (err) {
      console.error(event, err);
      reply({ ok: false, error: 'Something went wrong. Try again.' });
    }
  });
  const fail = error => ({ ok: false, error });
  const done = room => { room.lastActive = Date.now(); broadcast(room); return { ok: true }; };

  on('create', ({ name }) => {
    name = clean(name, 20);
    if (!name) return fail('Enter your name.');
    const room = createRoom();
    const p = addPlayer(room, name, socket);
    done(room);
    return { ok: true, code: room.code, token: p.token };
  });

  on('join', ({ code, name }) => {
    code = clean(code, 4).toUpperCase();
    name = clean(name, 20);
    const room = rooms.get(code);
    if (!name) return fail('Enter your name.');
    if (!room) return fail(`No room with code ${code || '—'}. Check the code and try again.`);
    if (room.phase !== 'lobby' && room.phase !== 'gameOver') return fail('That game has already started. Ask the room to finish this game first.');
    if (room.players.length >= MAX_PLAYERS) return fail(`That room is full (${MAX_PLAYERS} players).`);
    if (room.players.some(p => norm(p.name) === norm(name))) return fail('Someone in that room already has that name.');
    const p = addPlayer(room, name, socket);
    done(room);
    return { ok: true, code: room.code, token: p.token };
  });

  on('rejoin', ({ code, token }) => {
    const room = rooms.get(clean(code, 4).toUpperCase());
    const p = room && room.players.find(x => x.token === token);
    if (!p) return fail('That room has ended.');
    if (p.socketId && p.socketId !== socket.id) io.sockets.sockets.get(p.socketId)?.disconnect(true);
    attach(room, p, socket);
    done(room);
    return { ok: true, code: room.code, token: p.token };
  });

  on('leave', () => {
    const c = ctx();
    if (!c) return;
    socket.leave(c.room.code);
    socket.data.code = socket.data.pid = null;
    removePlayer(c.room, c.p.id);
    if (rooms.has(c.room.code)) done(c.room);
  });

  on('settings', ({ mode, startScore }) => {
    const c = ctx();
    if (!c || c.p.id !== c.room.ownerId || c.room.phase !== 'lobby') return fail('Only the room owner can change settings in the lobby.');
    if (mode === 'human' || mode === 'computer') c.room.settings.mode = mode;
    if (startScore === 5 || startScore === 10) {
      c.room.settings.startScore = startScore;
      c.room.players.forEach(p => { p.score = startScore; });
    }
    return done(c.room);
  });

  on('start', () => {
    const c = ctx();
    if (!c || c.p.id !== c.room.ownerId) return fail('Only the room owner can start the game.');
    if (c.room.phase !== 'lobby' && c.room.phase !== 'gameOver') return fail('The game is already running.');
    const min = MIN_PLAYERS[c.room.settings.mode];
    if (c.room.players.length < min) return fail(`You need at least ${min} players for this mode.`);
    startGame(c.room);
    return done(c.room);
  });

  on('hostSubmit', ({ category, word }) => {
    const c = ctx();
    if (!c || c.room.phase !== 'hostPicking' || c.p.id !== c.room.hostId) return fail("It's not your turn to host.");
    category = clean(category, 60);
    word = clean(word, 40);
    if (!category) return fail('Enter a category.');
    if (!word) return fail('Enter your secret word.');
    c.room.category = category;
    c.room.word = word;
    c.room.wordGroup = [word];
    c.room.notice = '';
    beginAnswering(c.room);
    return done(c.room);
  });

  on('newQuestion', () => {
    const c = ctx();
    if (!c || !isCPU(c.room) || c.p.id !== c.room.ownerId || c.room.phase !== 'answering') return fail('Only the room owner can change the question.');
    if (Object.keys(c.room.answers).length) return fail('Someone has already answered this question.');
    pickComputerQuestion(c.room);
    beginAnswering(c.room);
    return done(c.room);
  });

  on('answer', ({ text }) => {
    const c = ctx();
    if (!c || c.room.phase !== 'answering' || !c.room.answerers.includes(c.p.id)) return fail("You can't answer right now.");
    if (c.p.id in c.room.answers) return fail('Your answer is already locked in.');
    c.room.answers[c.p.id] = clean(text, 40);
    if (allSubmitted(c.room)) endAnswering(c.room);
    return done(c.room);
  });

  on('decide', ({ playerId, verdict }) => {
    const c = ctx();
    if (!c || c.room.phase !== 'judging' || !canJudge(c.room, c.p.id)) return fail('Only the host can judge answers.');
    if (!c.room.answers[playerId]?.trim()) return fail('There is no answer to judge.');
    if (verdict === 'same' || verdict === 'diff') c.room.decisions[playerId] = verdict;
    else delete c.room.decisions[playerId];
    return done(c.room);
  });

  on('applyScores', () => {
    const c = ctx();
    if (!c || c.room.phase !== 'judging' || !canJudge(c.room, c.p.id)) return fail('Only the host can apply scores.');
    if (pendingJudgements(c.room)) return fail('Judge every answer first.');
    applyScores(c.room);
    return done(c.room);
  });

  on('nextRound', () => {
    const c = ctx();
    if (!c || c.room.phase !== 'results' || c.p.id !== c.room.ownerId) return fail('Only the room owner can start the next round.');
    nextRound(c.room);
    return done(c.room);
  });

  on('skipRound', () => {
    const c = ctx();
    if (!c || c.p.id !== c.room.ownerId || !['hostPicking', 'answering', 'judging'].includes(c.room.phase)) return fail('Only the room owner can skip a round.');
    skipRound(c.room, 'The room owner skipped that round. No points changed.');
    return done(c.room);
  });

  on('endGame', () => {
    const c = ctx();
    if (!c || c.p.id !== c.room.ownerId || c.room.phase === 'lobby') return fail('Only the room owner can end the game.');
    clearTimeout(c.room.timer);
    c.room.phase = 'gameOver';
    return done(c.room);
  });

  on('backToLobby', () => {
    const c = ctx();
    if (!c || c.p.id !== c.room.ownerId || c.room.phase !== 'gameOver') return fail('Only the room owner can do that.');
    resetRound(c.room);
    c.room.phase = 'lobby';
    c.room.round = 0;
    c.room.notice = '';
    c.room.players.forEach(p => { p.score = c.room.settings.startScore; });
    return done(c.room);
  });

  socket.on('disconnect', () => {
    const c = ctx();
    if (!c || c.p.socketId !== socket.id) return;
    c.p.connected = false;
    c.p.socketId = null;
    if (c.room.ownerId === c.p.id) {
      clearTimeout(c.room.ownerTimer);
      c.room.ownerTimer = setTimeout(() => handOverOwner(c.room), OWNER_GRACE_MS);
    }
    broadcast(c.room);
  });
});

setInterval(() => {
  const now = Date.now();
  for (const room of rooms.values()) {
    if (room.players.some(p => p.connected)) room.lastActive = now;
    else if (now - room.lastActive > ROOM_IDLE_MS) { clearTimeout(room.timer); rooms.delete(room.code); }
  }
}, 60_000).unref();

loadPool();
server.listen(PORT, () => console.log(`Don't Say the Same Word running on http://localhost:${PORT}`));
