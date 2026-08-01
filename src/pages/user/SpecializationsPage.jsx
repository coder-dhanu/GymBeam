import React, { useState, useEffect } from 'react';
import Specialization from '../../components/Specialization';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

const SpecializationsPage = () => {
  const [header, setHeader] = useState({
    heroTitle: 'CORE SPECIALIZATIONS',
    description: 'Expert-led training programs designed for elite performance.',
    heroImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const headerRef = doc(db, 'settings', 'specialization');
        const headerSnap = await getDoc(headerRef);
        if (headerSnap.exists()) setHeader(headerSnap.data());
      } catch (error) {
        console.error("Error fetching specialization header:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeader();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={header.heroImage || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070"} 
            className="w-full h-full object-cover opacity-30" 
            alt="Gym Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <span className="text-primary font-bold tracking-[3px] uppercase text-xs mb-4 block animate-fade-in">OUR EXPERTISE</span>
          <h1 className="text-6xl md:text-8xl italic font-bold mb-6 font-heading uppercase leading-tight animate-blur-in tracking-tight">
            {header.heroTitle || 'CORE PILLARS'}
          </h1>
          <p className="text-text-sec text-lg max-w-2xl mx-auto animate-fade-in-up uppercase tracking-widest text-sm font-bold opacity-60">
            {header.description}
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <div className="-mt-16 pb-20 relative z-20">
        <Specialization />
      </div>
    </div>
  );
};

export default SpecializationsPage;
