import React, { useState, useEffect } from 'react';
import { Dumbbell, Users, PenTool, TrendingUp, Settings } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Specialization = () => {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.2 });
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.1 });
  const [data, setData] = useState({
    title: 'SPECIALIZATIONS',
    description: 'Highlight your gym\'s expertise in specific workout domains and training techniques.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'specialization');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching specialization data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section 
      id="specializations" 
      className="py-20 bg-bg-dark overflow-hidden transition-opacity duration-1000"
      style={{ opacity: loading ? 0 : 1 }}
    >
      <div className="max-w-[1280px] mx-auto px-5">
        
        <div 
          ref={headerRef}
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-5 reveal reveal-up ${headerVisible ? 'active' : ''}`}
        >
          <h2 className="text-7xl leading-[0.9] m-0 uppercase font-bold">
            <span className="text-white block">CORE</span> 
            <span className="text-primary block">{data.title.includes('SPECIAL') ? 'PILLARS' : data.title}</span>
          </h2>
          <p className="max-w-[350px] text-[13px] text-text-sec text-left lg:text-right uppercase">
            {data.description}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div className={`bg-bg-tert p-10 pt-10 px-8 rounded relative overflow-hidden flex flex-col min-h-[380px] group reveal reveal-up ${cardsVisible ? 'active' : ''}`}>
            <div className="relative h-16">
              <span className="text-[10px] font-bold tracking-[1px] text-text-sec">STRENGTH & CONDITIONING</span>
              <Dumbbell className="absolute -top-5 -right-5 text-white/5 transition-transform duration-500 group-hover:scale-110" size={120} strokeWidth={0.5} />
            </div>
            <h3 className="text-[32px] italic my-5 mb-4 font-heading uppercase">VARIETY OF<br/>TRAINING</h3>
            <p className="text-text-sec text-sm flex-grow">
              From Olympic lifting to functional agility, our diverse curriculum ensures a fitness goal un-crushed.
            </p>
            <TrendingUp className="mt-8 text-primary" size={20} />
          </div>

          <div 
            className={`bg-primary p-10 pt-10 px-8 rounded relative overflow-hidden flex flex-col min-h-[380px] group reveal reveal-up ${cardsVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="relative h-16 z-10">
              <span className="text-[10px] font-bold tracking-[1px] text-white">COMMUNITY</span>
            </div>
            <h3 className="text-[32px] italic my-5 mb-4 font-heading text-white z-10 uppercase">THRIVING<br/>COMMUNITY</h3>
            <p className="text-white/90 text-sm flex-grow z-10">
              Join a tribe of high achievers. We don't just train together, we evolve together in a culture of radical accountability.
            </p>
            <Users className="mt-8 text-white z-10" size={20} />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none transition-transform duration-700 group-hover:scale-105"></div>
          </div>

          <div 
            className={`bg-bg-tert p-10 pt-10 px-8 rounded relative overflow-hidden flex flex-col min-h-[380px] group reveal reveal-up ${cardsVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="relative h-16">
              <span className="text-[10px] font-bold tracking-[1px] text-text-sec">FACILITIES</span>
              <PenTool className="absolute -top-5 -right-5 text-white/5 transition-transform duration-500 group-hover:scale-110" size={120} strokeWidth={0.5} />
            </div>
            <h3 className="text-[32px] italic my-5 mb-4 font-heading uppercase">WELL-DESIGNED &<br/>DECENT</h3>
            <p className="text-text-sec text-sm flex-grow">
              A premium space designed for focus. Minimalist aesthetics meet high-performance ergonomics for the ultimate training flow.
            </p>
            <Settings className="mt-8 text-primary" size={20} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Specialization;
