# Don't Say the Same Word

An online party word game for 1–8 players, each on their own phone or computer.

One person creates a room and shares the 4-letter code (or invite link). The host picks a category and a secret word. Everyone answers at the same time and has 60 seconds. Match the host's word, or something that means the same (purple / violet), and you lose a point. Everyone starts with 5 or 10 points; hit 0 and you're out.

## Two ways to play

- **Human host** (3–8 players): the host rotates each round, types the category and secret word on their own phone, and judges each answer as Same or Different.
- **Computer host** (1–8 players): the computer asks a random question from a pool of 1,000+ questions and secretly picks one of its answers. It judges automatically; the room owner can change any verdict.

Every round's question and answers are added to the shared pool, so the computer learns new answers and synonyms as people play.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000 in two or more browser tabs or devices on the same network. Pass a port as an argument (`node server.js 5173`) or set `PORT`.

## How it works

- `server.js` – Express + Socket.IO server. Rooms live in memory, and the server owns the game state, timers and scoring. Each player receives only what they're allowed to see; the secret word stays with the host until the reveal.
- `public/index.html` – the client page.
- `data/questions-*.js` – the built-in question pool, one question per line: `Question|answer;answer=alias;answer`.
- `data/learned.json` – questions and answers learned from games (created at runtime, not committed).
- `render.yaml` – Render web service config.

Players who refresh or briefly lose connection rejoin their seat automatically. If the room owner disconnects for more than 20 seconds, the next connected player takes over the room.
