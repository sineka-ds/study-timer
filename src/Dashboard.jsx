import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(() => console.log('Start the backend server!'));
  }, []);

  const grouped = sessions.reduce((acc, s) => {
    const day = s.date.split('T')[0];
    acc[day] = (acc[day] || 0) + s.duration;
    return acc;
  }, {});

  const bySubject = sessions.reduce((acc, s) => {
    acc[s.subject] = (acc[s.subject] || 0) + s.duration;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [{
      label: 'Minutes studied',
      data: Object.values(grouped),
      backgroundColor: '#7F77DD'
    }]
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>📊 Study Dashboard</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Total sessions: <strong>{sessions.length}</strong>
      </p>

      <h3>Minutes studied per day</h3>
      {sessions.length === 0
        ? <p style={{ color: '#999' }}>No sessions yet. Complete a timer session first!</p>
        : <Bar data={chartData} />
      }

      <h3 style={{ marginTop: '2rem' }}>Time by subject</h3>
      {Object.entries(bySubject).length === 0
        ? <p style={{ color: '#999' }}>No subjects yet.</p>
        : Object.entries(bySubject).map(([subject, mins]) => (
          <div key={subject} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '10px 16px', marginBottom: '8px',
            background: '#EEEDFE', borderRadius: '8px'
          }}>
            <span>{subject}</span>
            <strong>{mins} min</strong>
          </div>
        ))
      }

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="/Pomodoro-Timer" style={{
          padding: '10px 20px', background: '#4A90D9',
          color: 'white', borderRadius: '8px', textDecoration: 'none'
        }}>
          ← Back to Timer
        </a>
      </div>
    </div>
  );
}

export default Dashboard;