import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Imports
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import SpecializationsPage from './pages/SpecializationsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import Trainers from './pages/Trainers';
import MembershipPlans from './pages/MembershipPlans';
import Gallery from './pages/Gallery';

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
    };

    document.title = titles[location.pathname] || 'GymBeam';
  }, [location]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <PageTitleManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/specializations" element={<SpecializationsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/membership-plans" element={<MembershipPlans />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Fallback to Home if route not found */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
