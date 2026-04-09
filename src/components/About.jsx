import React, { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const About = () => {
  const [leftRef, leftVisible] = useReveal({ threshold: 0.2 });
  const [rightRef, rightVisible] = useReveal({ threshold: 0.2 });
  const [data, setData] = useState({
    visionTitle: 'THE EVOLUTION OF PERFORMANCE',
    visionDescription: 'Empower individuals to transform their lives through fitness, fostering a supportive community where everyone can achieve their full potential.',
    visionImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000',
    missionTitle: 'FORGING CAPABILITY',
    missionDescription: 'Provide a unique atmosphere to enhance movement development through progressive programming, specialized coaching, and high-performance equipment.',
    missionImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
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
      className="py-20 bg-bg-sec overflow-hidden transition-opacity duration-1000"
      style={{ opacity: loading ? 0 : 1 }}
    >
      <div className="max-w-[1280px] mx-auto px-5 flex flex-col md:flex-row gap-16">
        
        {/* Left Side */}
        <div 
          ref={leftRef} 
          className={`flex-1 flex flex-col gap-10 reveal reveal-left ${leftVisible ? 'active' : ''}`}
        >
          <div className="max-w-[400px]">
            <span className="text-primary text-xs font-bold tracking-[2px] block mb-2.5">OUR VISION</span>
            <h2 className="text-5xl italic mb-5 uppercase leading-tight font-bold">{data.visionTitle}</h2>
            <p className="text-text-sec text-[15px]">
              {data.visionDescription}
            </p>
          </div>
          <div className="relative rounded overflow-hidden group">
            <img 
              src={data.visionImage} 
              alt="Our Vision" 
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
              src={data.missionImage} 
              alt="Our Mission" 
              className="w-full h-[450px] block object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute -bottom-4 left-5 font-heading text-[80px] text-[#ffb6c1] font-bold leading-none z-10 transition-transform duration-500 group-hover:-translate-y-2">01</div>
          </div>
          <div className="max-w-[400px]">
            <span className="text-primary text-xs font-bold tracking-[2px] block mb-2.5">OUR MISSION</span>
            <h2 className="text-5xl italic mb-5 uppercase leading-tight font-bold">{data.missionTitle}</h2>
            <p className="text-text-sec text-[15px]">
              {data.missionDescription}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
