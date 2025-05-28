import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/">🏠 Home</Link>

        {user.role === 'superadmin' && (
          <>
            <Link to="/manage-users">🔐 Manage Users</Link>
            <Link to="/reports">📊 All Reports</Link>
            <Link to="/settings">⚙️ System Settings</Link>
          </>
        )}

        {user.role === 'admin' && (
          <>
            <Link to="/bookings">📋 View Bookings</Link>
            <Link to="/contact-clients">📨 Contact Clients</Link>
          </>
        )}

        <Link to="/logout">🚪 Logout</Link>
      </aside>

      <main className="dashboard">
        <h1>Welcome, {user.username}!</h1>
        <p>Your role: <strong>{user.role}</strong></p>
      </main>
    </div>
  );
};

export default Dashboard;
