const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const FILE = path.join(__dirname, 'sessions.json');

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, '[]');
}

app.get('/api/sessions', (req, res) => {
  const data = fs.readFileSync(FILE, 'utf-8');
  res.json(JSON.parse(data));
});

app.post('/api/sessions', (req, res) => {
  const sessions = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  const newSession = {
    id: Date.now(),
    subject: req.body.subject || 'General',
    duration: req.body.duration || 25,
    date: new Date().toISOString()
  };
  sessions.push(newSession);
  fs.writeFileSync(FILE, JSON.stringify(sessions, null, 2));
  res.json(newSession);
});

app.listen(5000, () => console.log('Server running on port 5000'));