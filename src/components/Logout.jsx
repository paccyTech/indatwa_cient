import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all saved auth info
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to home
    navigate('/');
  }, [navigate]);

  return null; // Optional: Add a loader or message if you want
};

export default Logout;
