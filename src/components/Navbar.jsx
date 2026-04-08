import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/gymbeam_logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) => 
    `text-[13px] font-medium uppercase tracking-wider transition-colors hover:text-white ${
      isActive ? 'text-primary' : 'text-text-sec'
    }`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 animate-slide-down transition-all duration-300 ${scrolled
      ? 'bg-bg-dark/95 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl'
      : 'bg-transparent py-6'
      }`}>
      <div className="max-w-[1280px] mx-auto px-5 flex justify-between items-center">
        <NavLink to="/" className="flex items-center h-full">
          <img src={logo} alt="GYMBEAM" className={`transition-all duration-300 object-contain ${scrolled ? 'h-16' : 'h-17'
            }`} />
        </NavLink>

        <div className="flex items-center gap-10">
          <ul className="hidden lg:flex gap-8">
            <li><NavLink to="/" className={navLinkClass}>HOME</NavLink></li>
            <li><NavLink to="/about-us" className={navLinkClass}>ABOUT US</NavLink></li>
            <li><NavLink to="/specializations" className={navLinkClass}>SPECIALIZATIONS</NavLink></li>
            <li><NavLink to="/services" className={navLinkClass}>SERVICES</NavLink></li>
            <li><NavLink to="/trainers" className={navLinkClass}>TRAINERS</NavLink></li>
            <li><NavLink to="/membership-plans" className={navLinkClass}>MEMBERSHIP PLANS</NavLink></li>
            <li><NavLink to="/gallery" className={navLinkClass}>GALLERY</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>CONTACT</NavLink></li>
          </ul>
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 text-sm font-semibold uppercase rounded transition-colors whitespace-nowrap">JOIN NOW</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
