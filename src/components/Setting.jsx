import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Setting = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      if (parsedUser.role !== 'superadmin') {
        navigate('/');
      }
    }
  }, [navigate]);

  if (!user) return <div className="loading">Loading...</div>;

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
        <Link to="/logout">🚪 Logout</Link>
      </aside>

      <main className="dashboard">
        <h1>System Settings</h1>
        <p>Configure system-wide settings here.</p>

        {/* Example settings form */}
        <form className="settings-form">
          <div>
            <label>System Name</label>
            <input type="text" placeholder="Enter system name" />
          </div>
          <div>
            <label>Admin Contact Email</label>
            <input type="email" placeholder="admin@example.com" />
          </div>
          <div>
            <label>Maintenance Mode</label>
            <select>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </div>
          <button type="submit">Save Settings</button>
        </form>
      </main>
    </div>
  );
};

export default Setting;
