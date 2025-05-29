import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import '../styles/ContactClients.css';

const ContactClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        navigate('/'); // Redirect non-admin users to home
      } else {
        setUser(parsedUser);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetch('https://indatwa-server.onrender.com/api/bookings')
        .then(res => res.json())
        .then(data => {
          setClients(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching clients:', err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/">🏠 Home</Link>
        <Link to="/bookings">📋 View Bookings</Link>
        <Link to="/contact-clients">📨 Contact Clients</Link>
        <Link to="/logout">🚪 Logout</Link>
      </aside>

      <main className="dashboard">
        <h1>Contact Clients</h1>
        {loading ? (
          <p>Loading clients...</p>
        ) : (
          <div className="table-wrapper">
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event Date</th>
                  <th>Service</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.event_date}</td>
                    <td>{client.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactClients;
