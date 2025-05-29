import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      toast.warning('You must be logged in to access bookings');
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        toast.error('Unauthorized access');
        navigate('/unauthorized');
      } else {
        setUser(parsedUser);
      }
    }
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('https://indatwa-server.onrender.com/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`https://indatwa-server.onrender.com/api/bookings/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.id !== id));
        toast.success('Booking deleted successfully!');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('An error occurred while deleting the booking');
    }
  };

  const exportToExcel = () => {
    if (bookings.length === 0) {
      toast.info('No bookings to export');
      return;
    }
    try {
      const worksheet = XLSX.utils.json_to_sheet(bookings);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
      XLSX.writeFile(workbook, 'bookings.xlsx');
      toast.success('Exported to Excel successfully');
    } catch (error) {
      toast.error('Failed to export to Excel');
    }
  };

  const exportToPDF = () => {
    if (bookings.length === 0) {
      toast.info('No bookings to export');
      return;
    }

    try {
      const doc = new jsPDF();
      const tableColumn = [
        "Name",
        "Service",
        "Event Type",
        "Date",
        "Time",
        "Location",
        "Guests",
        "Phone"
      ];
      const tableRows = bookings.map(booking => [
        booking.name || '',
        booking.service || '',
        booking.event_type || '',
        booking.event_date || '',
        booking.event_time || '',
        booking.location || '',
        booking.guests || '',
        booking.phone || ''
      ]);

      doc.text("Bookings List", 14, 15);
      doc.autoTable({
        startY: 20,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [0, 31, 63] }
      });

      doc.save('bookings.pdf');
      toast.success('Exported to PDF successfully');
    } catch (error) {
      toast.error('Failed to export to PDF');
    }
  };

  if (!user) return <div className="loading">Loading...</div>;
  if (loading) return <div className="bookings-loading">Loading bookings...</div>;

  return (
    <div className="dashboard-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/">🏠 Home</Link>
        <Link to="/bookings">📋 View Bookings</Link>
        <Link to="/contact-clients">📨 Contact Clients</Link>
        <Link to="/logout">🚪 Logout</Link>
      </aside>

      <main className="dashboard-content">
        <h2>📋 All Bookings</h2>

        <div style={{ marginBottom: '1rem' }}>
          <button onClick={exportToExcel} className="export-button">Export to Excel</button>
          <button onClick={exportToPDF} className="export-button" style={{ marginLeft: '1rem' }}>Export to PDF</button>
        </div>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="responsive-table">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Event Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Guests</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.service}</td>
                    <td>{booking.event_type}</td>
                    <td>{booking.event_date}</td>
                    <td>{booking.event_time}</td>
                    <td>{booking.location}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.phone}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="delete-button"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="bookings-mobile">
              {bookings.map((booking) => (
                <div className="booking-card" key={booking.id}>
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Service:</strong> {booking.service}</p>
                  <p><strong>Event Type:</strong> {booking.event_type}</p>
                  <p><strong>Date:</strong> {booking.event_date}</p>
                  <p><strong>Time:</strong> {booking.event_time}</p>
                  <p><strong>Location:</strong> {booking.location}</p>
                  <p><strong>Guests:</strong> {booking.guests}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="delete-button"
                  >
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;
