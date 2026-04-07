import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 pb-[120px] bg-bg-dark">
      <div className="max-w-[1280px] mx-auto px-5 flex flex-col md:flex-row gap-20">
        
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="text-7xl leading-[0.9] m-0 font-heading">
            LET'S GET <br/> <span className="italic text-transparent [-webkit-text-stroke:1px_var(--color-primary)] leading-[0.9] font-heading">STARTED</span>
          </h2>
          <p className="text-base text-text-sec mt-5 mb-12">
            Ready to transform? Drop us a line or visit the facility.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-5">
              <div className="bg-primary w-[50px] h-[50px] flex justify-center items-center rounded shrink-0">
                <MapPin size={24} color="#fff" />
              </div>
              <div>
                <h4 className="text-xs tracking-[1px] mb-1.5 text-white font-heading">LOCATION</h4>
                <p className="text-sm text-text-sec leading-[1.5]">123 Muscle Way, Performance Center, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-primary w-[50px] h-[50px] flex justify-center items-center rounded shrink-0">
                <Clock size={24} color="#fff" />
              </div>
              <div>
                <h4 className="text-xs tracking-[1px] mb-1.5 text-white font-heading">OPERATIONAL HOURS</h4>
                <p className="text-sm text-text-sec leading-[1.5]">Mon-Fri : 06:00 — 22:00<br/>Sat-Sun : 07:00 — 20:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 bg-transparent">
          <form className="flex flex-col gap-5">
            
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-[1px] text-text-sec">FULL NAME</label>
                <input type="text" placeholder="Your Name" className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-colors duration-300 focus:border-primary font-body" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-[1px] text-text-sec">EMAIL ADDRESS</label>
                <input type="email" placeholder="you@email.com" className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-colors duration-300 focus:border-primary font-body" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[1px] text-text-sec">INTEREST</label>
              <select className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-colors duration-300 focus:border-primary font-body">
                <option>General Membership</option>
                <option>Personal Training</option>
                <option>Class Packages</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[1px] text-text-sec">MESSAGE</label>
              <textarea placeholder="How can we help you reach your goals?" rows="4" className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-colors duration-300 focus:border-primary font-body resize-y"></textarea>
            </div>

            <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-6 py-4 text-base font-semibold uppercase rounded transition-colors w-full mt-2.5">SEND MESSAGE</button>
            
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
