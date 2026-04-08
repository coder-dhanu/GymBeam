import React from 'react';
import { useReveal } from '../hooks/useReveal';

const About = () => {
  const [leftRef, leftVisible] = useReveal({ threshold: 0.2 });
  const [rightRef, rightVisible] = useReveal({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 bg-bg-sec overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 flex flex-col md:flex-row gap-16">
        
        {/* Left Side */}
        <div 
          ref={leftRef} 
          className={`flex-1 flex flex-col gap-10 reveal reveal-left ${leftVisible ? 'active' : ''}`}
        >
          <div className="max-w-[400px]">
            <span className="text-primary text-xs font-bold tracking-[2px] block mb-2.5">OUR VISION</span>
            <h2 className="text-5xl italic mb-5">THE EVOLUTION OF <br/> PERFORMANCE</h2>
            <p className="text-text-sec text-[15px]">
              Empower individuals to transform their lives through fitness, fostering a supportive community where everyone can achieve their full potential.
            </p>
          </div>
          <div className="relative rounded overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000" 
              alt="Athlete training" 
              className="w-full h-[300px] block object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Side */}
        <div 
          ref={rightRef} 
          className={`flex-1 flex flex-col gap-10 md:pt-16 reveal reveal-right ${rightVisible ? 'active' : ''}`}
        >
          <div className="relative rounded overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000" 
              alt="Gym weights" 
              className="w-full h-[450px] block object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute -bottom-4 left-5 font-heading text-[80px] text-[#ffb6c1] font-bold leading-none z-10 transition-transform duration-500 group-hover:-translate-y-2">01</div>
          </div>
          <div className="max-w-[400px]">
            <span className="text-primary text-xs font-bold tracking-[2px] block mb-2.5">OUR MISSION</span>
            <h2 className="text-5xl italic mb-5">FORGING CAPABILITY</h2>
            <p className="text-text-sec text-[15px]">
              Provide a unique atmosphere to enhance movement development through progressive programming, specialized coaching, and high-performance equipment.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
