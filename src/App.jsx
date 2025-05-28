import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookUs from './components/BookUs';
import About from './components/About';
import Services from './components/Services';
import Login from './components/Login';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './components/Dashboard';
import Support from './components/Support';
import Bookings from './components/Bookings';
import ManageUsers from './components/ManageUsers';
import Reports from './components/Report';
import ContactClients from './components/ContactClients';
import Setting from './components/Setting';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-users"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-clients"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ContactClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <Setting />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
