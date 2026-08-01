import React, { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const About = () => {
  const [introRef, introVisible] = useReveal({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.2 });
  
  const [data, setData] = useState({
    aboutTitle: 'Our Story',
    aboutHeadline: 'The Beam of Human Potential',
    aboutParagraph: 'Just as a building needs a beam, a person needs a gym in this busy life. This fundamental concept led to the launch of GYMBEAM. As a civil engineer by profession, I believe an engineer\'s true purpose is to make life more comfortable and structural—a philosophy we apply directly to your fitness journey. GYMBEAM was born from a collaboration with professional bodybuilder Mr. Shubham Dhole. As a passionate fitness coach, I focus on empowering you to execute daily activities with optimal performance, endurance, and strength while effectively managing stress, fatigue, and sedentary behavior across our brand in India.',
    visionTitle: 'VISION',
    visionDescription: 'Our vision is to empower individuals transform their lives through fitness fostering a community of strength, wellness & personal growth.',
    missionTitle: 'MISSION',
    missionDescription: 'Our mission is to provide a unique atmosphere to enhance movement development through health and fitness for toddlers, children, teens and families for a promotion life long wellness.',
    aboutImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const cloudData = docSnap.data();
          setData(prev => ({ 
            ...prev, 
            ...cloudData 
          }));
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="about"
      className="py-24 bg-bg-sec overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5">
        
        {/* About Us / Founder's Story Section */}
        <div 
          ref={introRef}
          className={`flex flex-col lg:flex-row gap-16 mb-24 reveal reveal-up ${introVisible ? 'active' : ''}`}
        >
          <div className="flex-1">
            <span className="text-primary text-xs font-bold tracking-[3px] uppercase mb-4 block">{data.aboutTitle}</span>
            <h2 className="text-5xl md:text-7xl italic font-bold mb-8 leading-[1.1] font-heading">{data.aboutHeadline}</h2>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-text-sec text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
              {data.aboutParagraph}
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="relative rounded-lg overflow-hidden group shadow-2xl">
              <img
                src={data.aboutImage}
                alt="GymBeam Philosophy"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent"></div>
            </div>
            {/* Structural Element Decoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-primary/30 -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-primary/30 -z-10"></div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Vision Card */}
          <div className={`bg-bg-dark p-12 rounded-lg border-l-4 border-primary reveal reveal-left ${cardsVisible ? 'active' : ''}`}>
            <span className="text-primary text-xs font-bold tracking-[2px] uppercase mb-4 block">FUTURE FOCUS</span>
            <h3 className="text-4xl italic font-bold mb-6 font-heading">{data.visionTitle}</h3>
            <p className="text-text-sec text-lg leading-relaxed">
              {data.visionDescription}
            </p>
          </div>

          {/* Mission Card */}
          <div className={`bg-bg-dark p-12 rounded-lg border-l-4 border-primary reveal reveal-right ${cardsVisible ? 'active' : ''}`}>
            <span className="text-primary text-xs font-bold tracking-[2px] uppercase mb-4 block">DAILY PURPOSE</span>
            <h3 className="text-4xl italic font-bold mb-6 font-heading">{data.missionTitle}</h3>
            <p className="text-text-sec text-lg leading-relaxed">
              {data.missionDescription}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
