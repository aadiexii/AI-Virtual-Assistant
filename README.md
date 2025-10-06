AI Virtual Assistant
================

A simple voice-driven assistant that listens for a wake phrase, uses Gemini to understand commands, and performs quick actions while speaking responses.

Features
--------
- Voice activation with a user-defined assistant name
- Continuous speech recognition and speech synthesis (Web Speech API)
- Quick actions: Google and YouTube search, open Instagram/Facebook, show weather, open calculator
- Minimal history view and basic customization

Tech Stack
----------
- Frontend: React, Web Speech API
- Backend: Node.js with Gemini integration
- AI: Gemini API (via backend)

Environment Variables
---------------------
Backend `.env`:

```
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_ORIGIN=http://localhost:5173
```

Frontend `.env` (Vite-style):

```
VITE_SERVER_URL=http://localhost:5000
```

Installation
------------
```
git clone <your-repo-url>
cd "AI Virtual Stack"

cd backend
npm install

cd ../frontend
npm install
```

Run
---
Backend:
```
cd backend
npm run dev
```

Frontend:
```
cd frontend
npm run dev
```

Notes
-----
- Keep `GEMINI_API_KEY` in the backend only; do not expose it to the client.
- Allow microphone permission in the browser for speech recognition.

Structure
---------
```
AI Virtual Stack/
  backend/
  frontend/
    src/
      pages/
        Home.jsx
  README.md
```



