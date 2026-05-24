# Study Room Focus Timer

A pomodoro timer app I extended with a full backend, session tracking, and a study dashboard.

The base project was a frontend-only React timer with no data persistence. I forked it and added the backend and analytics features myself.

Live base repo: [dimples-app/Pomodoro-Timer](https://github.com/dimples-app/Pomodoro-Timer)

---

## What I added

The original app had a countdown timer, break controls, and a basic task list. Nothing was saved — refresh the page and everything was gone.

I added three things:

**Session history dashboard**
Built a Node/Express API that saves every completed focus session to a JSON file. A new dashboard page pulls that data and shows a bar chart of study minutes per day using Chart.js.

**Subject tracking**
Added a text input above the timer where you type what you are studying. That label gets saved with each session, so the dashboard can show you how much time you spent on each subject.

**Browser notifications**
When the timer hits zero, the app sends a desktop notification and plays a short sound using the Web Audio API. No library needed — just the browser's built-in APIs.

---

## Tech used

- React 16, React Router v5
- Node.js, Express
- Chart.js, react-chartjs-2
- CSS

---

## Running locally

You need two terminals.

Terminal 1 — frontend:
```bash
git clone https://github.com/sineka-ds/study-timer
cd study-timer
npm install
npm start
```

Terminal 2 — backend:
```bash
cd server
npm install
node index.js
```

Open `http://localhost:3000/Pomodoro-Timer` in your browser.

---

## What I wrote vs what was already there

I wrote:
- `server/index.js` — the entire backend API
- `src/Dashboard.jsx` — the dashboard and chart page
- Subject input and session save logic in `Pomodoro.js`
- Notification and sound code
- All the CSS theming

Already in the original:
- Timer countdown logic
- Focus and break duration controls
- Task list
- Progress bar

---
## What I learned building this

Before this project I had only built frontend React apps. This was the first time I 
wrote a backend API myself and connected it to a React app using fetch. I learned 
what CORS is and why it's needed, how POST and GET requests work in practice, and 
how to save and read data on a server. Seeing the data I saved actually show up in 
the chart on the dashboard was the moment it all made sense to me.
