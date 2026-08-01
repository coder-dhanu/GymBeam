import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Hero = () => {
  const [data, setData] = useState({
    heroTitleLine1: 'TRANSFORM',
    heroTitleLine2: 'YOUR',
    heroTitleLine3: 'POTENTIAL',
    heroDescription: "Elite training for toddlers to adults. Join the community of strength and redefine what's possible for your body.",
    heroBtn1Text: 'START YOUR JOURNEY',
    heroBtn2Text: 'VIEW PROGRAMS',
    heroBgText: 'BEAM',
    heroBgImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'Home');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center bg-bg-dark bg-cover bg-center overflow-hidden pt-20 transition-opacity duration-1000"
      style={{
        backgroundImage: `url('${data.heroBgImage}')`,
        opacity: loading ? 0 : 1
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/70 to-bg-dark/40 z-10"></div>

      <div className="max-w-[1280px] mx-auto px-5 relative z-20 w-full lg:max-w-4xl lg:mx-0 lg:ml-[max(0px,calc((100vw-1280px)/2))] lg:px-5">
        <h1 className="text-6xl md:text-[100px] italic font-bold leading-[0.95] mb-8 uppercase animate-blur-in">
          <span>{data.heroTitleLine1}</span><br />
          <span>{data.heroTitleLine2}</span><br />
          <span>{data.heroTitleLine3}</span>
        </h1>
        <p className="text-lg text-text-sec max-w-md mb-10 border-l-4 border-primary pl-5 reveal active reveal-up animate-[blurIn_1.2s_cubic-bezier(0.25,1,0.5,1)_0.4s_forwards]">
          {data.heroDescription}
        </p>
        <div className="flex flex-wrap gap-5 reveal active reveal-up animate-[blurIn_1.2s_cubic-bezier(0.25,1,0.5,1)_0.7s_forwards]">
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 text-sm font-semibold uppercase rounded transition-colors shadow-[0_0_20px_rgba(233,33,80,0.3)]">{data.heroBtn1Text}</button>
          <button className="bg-transparent border border-white hover:bg-white hover:text-bg-dark text-white px-6 py-3 text-sm font-semibold uppercase rounded transition-all">{data.heroBtn2Text}</button>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-[5%] font-heading text-[150px] md:text-[280px] font-bold text-primary z-0 leading-none pointer-events-none reveal active reveal-right animate-[blurIn_2s_cubic-bezier(0.25,1,0.5,1)_1s_forwards]">
        <span className="opacity-25 uppercase">{data.heroBgText}</span>
      </div>
    </section>
  );
};

export default Hero;
