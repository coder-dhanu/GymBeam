import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

const Services = () => {
  const [ref, visible] = useReveal({ threshold: 0.1 });
  const [data, setData] = useState({
    title: 'OUR SERVICES',
    description: 'Manage the gym classes, personal training options, and amenities offered by GymBeam.'
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Header Data
        const docRef = doc(db, 'settings', 'services');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }

        // Fetch Collection Data
        const servicesRef = collection(db, 'services');
        const q = query(servicesRef, orderBy('order', 'asc'));
        const servicesSnap = await getDocs(q);
        
        const servicesList = servicesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fallback for demo/migration
        if (servicesList.length === 0) {
          setServices([
            {
              id: '1',
              title: "GROUP CLASSES",
              desc: "High-intensity interval training, strength cycles, and mobility sessions led by expert instructors.",
              linkText: "VIEW SCHEDULE",
              order: 1
            },
            {
              id: '2',
              title: "PERSONAL TRAINING",
              desc: "Customized one-on-one coaching specifically for your physiological metrics and performance goals.",
              linkText: "LEARN MORE",
              order: 2
            },
            {
              id: '3',
              title: "ELITE COACHING",
              desc: "Professional athlete preparation, competition programming, and technical analysis.",
              linkText: "LEARN MORE",
              order: 3
            },
            {
              id: '4',
              title: "YOUTH ACADEMY",
              desc: "Specialized movement development programs for toddlers and young athletes to build a foundation.",
              linkText: "ENROLL NOW",
              order: 4
            }
          ]);
        } else {
          setServices(servicesList);
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section 
      id="services" 
      className="py-20 bg-bg-sec border-t border-white/5 transition-opacity duration-1000"
      style={{ opacity: loading ? 0 : 1 }}
    >
      <div className="max-w-[1280px] mx-auto px-5">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[56px] italic mb-2.5 tracking-[2px] font-heading uppercase leading-tight font-bold">
            <span className="text-white">OUR</span> <span className="text-primary">{data.title && data.title.replace('OUR ', '')}</span>
          </h2>
          <div className="w-[60px] h-1 bg-primary mb-4"></div>
          <p className="text-text-sec max-w-xl uppercase text-sm tracking-wide">
            {data.description}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div 
              className={`bg-bg-tert p-10 px-8 flex flex-col justify-between min-h-[280px] border-t-4 border-transparent transition-all duration-300 hover:border-t-primary hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group reveal reveal-up ${visible ? 'active' : ''}`} 
              key={service.id}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div>
                <h3 className="text-2xl italic mb-4 font-heading">{service.title}</h3>
                <p className="text-[13px] text-text-sec leading-[1.6]">{service.desc}</p>
              </div>
              <a href="#" className="flex items-center gap-2.5 text-[11px] font-bold tracking-[1px] text-text-sec uppercase mt-8 transition-colors duration-300 group-hover:text-primary">
                {service.linkText || 'LEARN MORE'} <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
