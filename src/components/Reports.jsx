import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import '../styles/Dashboard.css';
import '../styles/Reports.css';

const Reports = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings');
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'superadmin') {
      fetchBookings();
    }
  }, [user]);

  if (!user) return <div className="loading">Loading...</div>;
  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Line chart data: guests over dates
  const chartData = bookings.map(b => ({
    date: new Date(b.event_date).toLocaleDateString(),
    guests: b.guests
  }));

  // Bar chart data: bookings per service
  const serviceCount = {};
  bookings.forEach(b => {
    serviceCount[b.service] = (serviceCount[b.service] || 0) + 1;
  });
  const barChartData = Object.entries(serviceCount).map(([service, count]) => ({
    service,
    bookings: count
  }));

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
        <h1>All Reports (Bookings)</h1>

        <div className="chart-section">
          <h2>📈 Guest Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="guests" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h2>📊 Bookings Per Service</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Event Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Guests</th>
                  <th>Duration</th>
                  <th>Notes</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.phone}</td>
                    <td>{b.service}</td>
                    <td>{b.event_type}</td>
                    <td>{new Date(b.event_date).toLocaleDateString()}</td>
                    <td>{b.event_time}</td>
                    <td>{b.location}</td>
                    <td>{b.guests}</td>
                    <td>{b.duration}</td>
                    <td>{b.notes || '-'}</td>
                    <td>{new Date(b.created_at).toLocaleString()}</td>
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

export default Reports;
