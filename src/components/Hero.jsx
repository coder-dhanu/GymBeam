import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-bg-dark bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/70 to-bg-dark/40 z-10"></div>
      
      <div className="max-w-[1280px] mx-auto px-5 relative z-20 w-full lg:max-w-4xl lg:mx-0 lg:ml-[max(0px,calc((100vw-1280px)/2))] lg:px-5">
        <h1 className="text-6xl md:text-[100px] italic font-bold leading-[0.95] mb-8 uppercase">
          <span>TRANSFORM</span><br />
          <span>YOUR</span><br />
          <span>POTENTIAL</span>
        </h1>
        <p className="text-lg text-text-sec max-w-md mb-10 border-l-4 border-primary pl-5">
          Elite training for toddlers to adults. Join the community of strength and redefine what's possible for your body.
        </p>
        <div className="flex flex-wrap gap-5">
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 text-sm font-semibold uppercase rounded transition-colors">START YOUR JOURNEY</button>
          <button className="bg-transparent border border-white hover:bg-white hover:text-bg-dark text-white px-6 py-3 text-sm font-semibold uppercase rounded transition-all">VIEW PROGRAMS</button>
        </div>
      </div>
      
      <div className="absolute -bottom-10 -right-[5%] font-heading text-[150px] md:text-[280px] font-bold text-primary opacity-15 z-0 leading-none pointer-events-none">
        BEAM
      </div>
    </section>
  );
};

export default Hero;
