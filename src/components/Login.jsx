import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://indatwa-server.onrender.com/api/login', credentials);
      const { user } = res.data;

      // Save user info in local storage
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!');
      setTimeout(() => {
        window.location.href = '/dashboard'; // Redirect to dashboard
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Check credentials.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="overlay">
          <h1>Welcome Back!</h1>
          <p>Enter your credentials to access your dashboard</p>
        </div>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
