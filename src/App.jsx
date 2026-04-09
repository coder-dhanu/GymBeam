import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Imports
import Home from './pages/user/Home';
import AboutUs from './pages/user/AboutUs';
import SpecializationsPage from './pages/user/SpecializationsPage';
import ServicesPage from './pages/user/ServicesPage';
import ContactPage from './pages/user/ContactPage';
import Trainers from './pages/user/Trainers';
import MembershipPlans from './pages/user/MembershipPlans';
import Gallery from './pages/user/Gallery';

// Admin Page Imports
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Category from './pages/admin/Category';
import Products from './pages/admin/Products';
import Messages from './pages/admin/Messages';
import ProtectedRoute from './components/ProtectedRoute';

const PageTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'Home | GymBeam',
      '/home': 'Home | GymBeam',
      '/about-us': 'About Us | GymBeam',
      '/specializations': 'Specializations | GymBeam',
      '/services': 'Services | GymBeam',
      '/trainers': 'Trainers | GymBeam',
      '/membership-plans': 'Membership Plans | GymBeam',
      '/gallery': 'Gallery | GymBeam',
      '/contact': 'Contact | GymBeam',
      '/admin/login': 'Admin Login | GymBeam',
      '/admin': 'Admin Dashboard | GymBeam',
    };

    document.title = titles[location.pathname] || 'GymBeam';
  }, [location]);

  return null;
};

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <PageTitleManager />
      {!isAdminPath && <Navbar />}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/specializations" element={<SpecializationsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/membership-plans" element={<MembershipPlans />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/categories" element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="/admin/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />

        {/* Fallback to Home if route not found */}
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
