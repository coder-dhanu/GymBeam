import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Page Imports
import Home from "./pages/user/Home";
import AboutUs from "./pages/user/AboutUs";
import SpecializationsPage from "./pages/user/SpecializationsPage";
import ServicesPage from "./pages/user/ServicesPage";
import ContactPage from "./pages/user/ContactPage";
import Trainers from "./pages/user/Trainers";
import MembershipPlans from "./pages/user/MembershipPlans";
import Gallery from "./pages/user/Gallery";

// Admin Page Imports
import Login from "./pages/admin/Login";
import AdminHome from "./pages/admin/Home";
import AdminAbout from "./pages/admin/About";
import AdminTrainers from "./pages/admin/Trainers";
import AdminGallery from "./pages/admin/Gallery";
import AdminContact from "./pages/admin/Contact";
import AdminMembership from "./pages/admin/Membership";
import AdminServices from "./pages/admin/Services";
import AdminSpecialization from "./pages/admin/Specialization";
import ProtectedRoute from "./components/ProtectedRoute";

const PageTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home | GymBeam",
      "/home": "Home | GymBeam",
      "/about-us": "About Us | GymBeam",
      "/specializations": "Specializations | GymBeam",
      "/services": "Services | GymBeam",
      "/trainers": "Trainers | GymBeam",
      "/membership-plans": "Membership Plans | GymBeam",
      "/gallery": "Gallery | GymBeam",
      "/contact": "Contact | GymBeam",
      "/admin/login": "Admin Login | GymBeam",
      "/admin": "Admin | Manage Home",
      "/admin/about": "Admin | Manage About",
      "/admin/trainers": "Admin | Manage Trainers",
      "/admin/gallery": "Admin | Manage Gallery",
      "/admin/contact": "Admin | Manage Contact",
      "/admin/membership": "Admin | Manage Membership",
      "/admin/services": "Admin | Manage Services",
      "/admin/specialization": "Admin | Manage Specialization",
    };

    document.title = titles[location.pathname] || "GymBeam";
  }, [location]);

  return null;
};

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

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

        {/* Admin Routespe */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <AdminAbout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute>
              <AdminTrainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/membership"
          element={
            <ProtectedRoute>
              <AdminMembership />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/specialization"
          element={
            <ProtectedRoute>
              <AdminSpecialization />
            </ProtectedRoute>
          }
        />

        {/* Fallback to Home if route not found */}
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
