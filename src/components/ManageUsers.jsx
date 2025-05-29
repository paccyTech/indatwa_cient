import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/Dashboard.css';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', role: 'admin' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', role: '' });
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
    if (user && user.role === 'superadmin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://indatwa-server.onrender.com/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.password) {
      const msg = 'Username and password are required';
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const res = await fetch('https://indatwa-server.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to create user');
      }
      await fetchUsers();
      setForm({ username: '', password: '', role: 'admin' });
      toast.success('User created successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setError(null);
    try {
      const res = await fetch(`https://indatwa-server.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete user');
      }
      await fetchUsers();
      toast.success('User deleted!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditForm({ username: user.username, role: user.role });
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({ username: '', role: '' });
  };

  const handleSaveEdit = async (id) => {
    if (!editForm.username) {
      const msg = 'Username cannot be empty';
      setError(msg);
      toast.error(msg);
      return;
    }
    setError(null);
    try {
      const res = await fetch(`https://indatwa-server.onrender.com/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update user');
      }
      setEditingUserId(null);
      await fetchUsers();
      toast.success('User updated successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/">🏠 Home</Link>

        {user.role === 'superadmin' && (
          <>
            <Link to="/manage-users">🔐 Manage Users</Link>
            <Link to="/reports">📊 All Reports</Link>
            <Link to="/bookings">📋 View Bookings</Link>
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
        <h1>Manage Users</h1>

        {/* Create User Form */}
        <form onSubmit={handleCreateUser} className="user-form">
          <h2>Create New User</h2>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button type="submit">Create User</button>
        </form>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    {editingUserId === u.id ? (
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) =>
                          setEditForm({ ...editForm, username: e.target.value })
                        }
                      />
                    ) : (
                      u.username
                    )}
                  </td>
                  <td>
                    {editingUserId === u.id ? (
                      <select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                      >
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    ) : (
                      u.role
                    )}
                  </td>
                  <td>{new Date(u.created_at).toLocaleString()}</td>
                  <td>
                    {editingUserId === u.id ? (
                      <>
                        <button onClick={() => handleSaveEdit(u.id)}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(u)}>Edit</button>
                        <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
