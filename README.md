# Don't Say the Same Word

A pass-and-play party word game for 1–8 players on one device.

The host picks a category and a secret word. Every player gets 60 seconds to secretly type a word from that category. Match the host's word (or something that means the same, like purple / violet) and you lose a point. Everyone starts with 5 or 10 points; hit 0 and you're out.

## Two ways to play

- **Human host** (3–8 players): the host rotates each round, types the category and secret word, and judges each answer as Same or Different.
- **Computer host** (1–8 players): the computer asks a random question from a pool of 1,000+ questions and secretly picks one of its answers at random.

Every round's question and answers are added to the pool on that device (saved in the browser), so the computer learns new answers and synonyms as you play.

## Run locally

Open `index.html` in a browser. No build step or server needed.

## Files

- `index.html` – the game
- `questions-1.js` … `questions-5.js` – the built-in question pool, one question per line: `Question|answer;answer=alias;answer`
- `render.yaml` – Render static site config
