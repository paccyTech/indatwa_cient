import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! Page Not Found.</p>
        <p className="notfound-submessage">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button className="notfound-btn" onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
