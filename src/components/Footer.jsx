import React from 'react';
import logo from '../assets/gymbeam_logo.png';

const Footer = () => {
  return (
    <footer className="bg-bg-sec border-t border-white/5 py-4 min-h-[120px] flex items-center">
      <div className="max-w-[1280px] mx-auto px-5 w-full flex flex-col gap-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="flex items-center">
            <img src={logo} alt="GYMBEAM" className="h-17 w-auto object-contain" />
          </div>

          <ul className="flex flex-col md:flex-row gap-4 md:gap-[30px] items-center text-center md:text-left">
            <li><a href="#" className="text-[11px] font-semibold text-text-sec hover:text-white tracking-[1px] transition-colors">PRIVACY POLICY</a></li>
            <li><a href="#" className="text-[11px] font-semibold text-text-sec hover:text-white tracking-[1px] transition-colors">TERMS OF SERVICE</a></li>
            <li><a href="#" className="text-[11px] font-semibold text-text-sec hover:text-white tracking-[1px] transition-colors">MEMBERSHIP FAQ</a></li>
            <li><a href="#" className="text-[11px] font-semibold text-text-sec hover:text-white tracking-[1px] transition-colors">CAREERS</a></li>
          </ul>

          <div className="flex gap-5 items-center">
            <a href="#" aria-label="Facebook" className="text-text-sec hover:text-primary transition-colors flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-text-sec hover:text-primary transition-colors flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-text-sec hover:text-primary transition-colors flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-white/5">
          <p className="text-[10px] text-white/30 tracking-[2px] uppercase">&copy; {new Date().getFullYear()} GYMBEAM. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
