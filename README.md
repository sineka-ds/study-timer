#  Study Room Focus Timer

A full-stack productivity app built with React and Node.js that helps you study smarter using the Pomodoro technique — with session tracking, subject labels, and a analytics dashboard.

> Forked from [dimples-app/Pomodoro-Timer](https://github.com/dimples-app/Pomodoro-Timer) and extended with 3 original features.

---

##  What I Built On Top

The original project was a basic timer with no backend. I added:

### 1.  Session History Dashboard
- Built a Node.js + Express REST API from scratch
- Every completed session is saved automatically
- Bar chart shows study minutes per day using Chart.js
- Data stays saved even after closing the browser

### 2.  Subject Labels Per Session
- Added a text input above the timer
- User types what they are studying before starting
- Each session saved with its subject name
- Dashboard shows total time spent per subject

### 3.  Browser Notification + Sound Alert
- Desktop notification fires when session ends
- Sound plays using the Web Audio API
- Works even when browser tab is in background
- No external library needed

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 16, React Router v5 |
| Charts | Chart.js, react-chartjs-2 |
| Backend | Node.js, Express |
| Data Storage | JSON file via fs module |
| Styling | Custom CSS |

---

##  How to Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/YOUR-USERNAME/study-timer
cd study-timer
```

**2. Start the frontend**
```bash
npm install
npm start
```

**3. Start the backend in a new terminal**
```bash
cd server
npm install
node index.js
```

**4. Open your browser**
http://localhost:3000/Pomodoro-Timer

---

##  Folder Structure
## What I Added vs What Was Already There

**Already in the original project:**
- Timer countdown (focus + break)
- Duration controls (+ / - buttons)
- Basic task list
- Progress bar

**I built these from scratch:**
- `server/index.js` — Node.js REST API with GET and POST routes
- `server/sessions.json` — data storage for all sessions
- `src/Dashboard.jsx` — full dashboard page with chart
- Subject input field in the timer
- Browser notification and sound when session ends
- Navigation between Timer and Dashboard pages

---

##  What I Learned

- Building a REST API with Node.js and Express
- Connecting React frontend to a backend with fetch
- Persisting data without a database using JSON files
- Data visualization with Chart.js
- Multi-page navigation with React Router
- Browser Notification API and Web Audio API

---

##  Original Project

Base project by [dimples-app](https://github.com/dimples-app/Pomodoro-Timer).

My contributions: `server/` folder, `src/Dashboard.jsx`, subject input in `Pomodoro.js`, notification and sound logic, CSS theming.



```

**4. Open your browser**
