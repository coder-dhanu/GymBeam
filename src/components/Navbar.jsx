import React, { useState, useEffect } from 'react';
import logo from '../assets/gymbeam_logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
      ? 'bg-bg-dark/95 backdrop-blur-md border-b border-white/5 py-4'
      : 'bg-transparent py-6'
      }`}>
      <div className="max-w-[1280px] mx-auto px-5 flex justify-between items-center">
        <a href="/" className="flex items-center h-full">
          <img src={logo} alt="GYMBEAM" className={`transition-all duration-300 object-contain ${scrolled ? 'h-12' : 'h-17'
            }`} />
        </a>

        <div className="flex items-center gap-10">
          <ul className="hidden lg:flex gap-8">
            <li><a href="#about" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">ABOUT US</a></li>
            <li><a href="#specializations" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">SPECIALIZATIONS</a></li>
            <li><a href="#services" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">SERVICES</a></li>
            <li><a href="#trainers" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">TRAINERS</a></li>
            <li><a href="#membership Plans" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">MEMBERSHIP PLANS</a></li>
            <li><a href="#gallery" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">GALLERY</a></li>
            <li><a href="#contact" className="text-[13px] font-medium uppercase text-text-sec hover:text-white transition-colors">CONTACT</a></li>
          </ul>
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 text-sm font-semibold uppercase rounded transition-colors whitespace-nowrap">JOIN NOW</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
