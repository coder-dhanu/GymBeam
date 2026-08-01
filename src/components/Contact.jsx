import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Loader2 } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Contact = () => {
  const [contentRef, contentVisible] = useReveal({ threshold: 0.2 });
  const [formRef, formVisible] = useReveal({ threshold: 0.2 });
  const [data, setData] = useState({
    title: "LET'S GET STARTED",
    subtitle: "Ready to transform? Drop us a line or visit the facility.",
    address: 'Near 2nd Bus Stand, Gokak, Karnataka 591307',
    operationalHours: 'Mon-Fri : 06:00 — 22:00\nSat-Sun : 07:00 — 20:00'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="contact" className="py-20 pb-[120px] bg-bg-dark transition-opacity duration-1000" style={{ opacity: loading ? 0 : 1 }}>
      <div className="max-w-[1280px] mx-auto px-5 flex flex-col md:flex-row gap-20">
        
        {/* Left Side */}
        <div 
          ref={contentRef}
          className={`flex-1 reveal reveal-left ${contentVisible ? 'active' : ''}`}
        >
          <h2 className="text-7xl leading-[0.9] m-0 font-heading uppercase">
            {data.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word === 'STARTED' || word === 'TRANSFORM' ? (
                  <span className="italic text-transparent [-webkit-text-stroke:1px_var(--color-primary)] leading-[0.9] font-heading">{word}</span>
                ) : (
                  <>{word} </>
                )}
                {i === 1 && <br/>}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-base text-text-sec mt-5 mb-12">
            {data.subtitle}
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-5">
              <div className="bg-primary w-[50px] h-[50px] flex justify-center items-center rounded shrink-0 transition-transform hover:scale-110">
                <MapPin size={24} color="#fff" />
              </div>
              <div>
                <h4 className="text-xs tracking-[1px] mb-1.5 text-white font-heading">LOCATION</h4>
                <p className="text-sm text-text-sec leading-[1.5]">{data.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-primary w-[50px] h-[50px] flex justify-center items-center rounded shrink-0 transition-transform hover:scale-110">
                <Clock size={24} color="#fff" />
              </div>
              <div>
                <h4 className="text-xs tracking-[1px] mb-1.5 text-white font-heading">OPERATIONAL HOURS</h4>
                <p className="text-sm text-text-sec leading-[1.5] whitespace-pre-line">{data.operationalHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div 
          ref={formRef}
          className={`flex-1 bg-transparent reveal reveal-right ${formVisible ? 'active' : ''}`}
        >
          <form className="flex flex-col gap-5">
            
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-[1px] text-text-sec">FULL NAME</label>
                <input type="text" placeholder="Your Name" className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-all duration-300 focus:border-primary focus:bg-[#1a1a1a] font-body" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-[1px] text-text-sec">EMAIL ADDRESS</label>
                <input type="email" placeholder="you@email.com" className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-all duration-300 focus:border-primary focus:bg-[#1a1a1a] font-body" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[1px] text-text-sec">INTEREST</label>
              <select className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-all duration-300 focus:border-primary focus:bg-[#1a1a1a] font-body cursor-pointer">
                <option>General Membership</option>
                <option>Personal Training</option>
                <option>Class Packages</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[1px] text-text-sec">MESSAGE</label>
              <textarea placeholder="How can we help you reach your goals?" rows="4" className="bg-bg-tert border border-white/5 p-4 text-white text-sm rounded outline-none transition-all duration-300 focus:border-primary focus:bg-[#1a1a1a] font-body resize-y"></textarea>
            </div>

            <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-6 py-4 text-base font-semibold uppercase rounded transition-all w-full mt-2.5 shadow-lg shadow-primary/20 active:scale-[0.98]">SEND MESSAGE</button>
            
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
