import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Show toast message
    toast.success('Logged out successfully!');

    // Redirect after a short delay to let toast show
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500); // Adjust delay if needed

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return null; // Or return a loader/message if you prefer
};

export default Logout;
