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
import Reports from './components/reports';
import ContactClients from './components/ContactClients';
import Settings from './components/settings';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact-clients" element={<ContactClients />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
