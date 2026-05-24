import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pomodoro from './pomodoro/Pomodoro';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '10px', background: '#f0f0f0' }}>
        <a href="/Pomodoro-Timer" style={{ marginRight: '20px', color: '#4A90D9', fontWeight: 'bold' }}>⏱ Timer</a>
        <a href="/Pomodoro-Timer/dashboard" style={{ color: '#7F77DD', fontWeight: 'bold' }}>📊 Dashboard</a>
      </div>
      <Switch>
        <Route exact path="/Pomodoro-Timer" component={Pomodoro} />
        <Route path="/Pomodoro-Timer/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;