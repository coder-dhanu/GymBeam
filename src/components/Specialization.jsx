import React, { useState, useEffect } from 'react';
import { Dumbbell, Users, PenTool, TrendingUp, Settings, Activity, ShieldCheck, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

const IconsMap = {
  Dumbbell, Users, PenTool, TrendingUp, Settings, Activity, ShieldCheck, Zap
};

const Specialization = () => {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.2 });
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.1 });
  const [data, setData] = useState({
    title: 'SPECIALIZATIONS',
    description: 'Highlight your gym\'s expertise in specific workout domains and training techniques.'
  });
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Header Data
        const docRef = doc(db, 'settings', 'specialization');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }

        // Fetch Collection Data
        const specsRef = collection(db, 'specializations');
        const q = query(specsRef, orderBy('order', 'asc'));
        const specsSnap = await getDocs(q);
        
        const specsList = specsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fallback for demo if collection is empty
        if (specsList.length === 0) {
          setSpecs([
            {
              id: '1',
              category: 'TRAINING',
              title: 'VARIETY OF\nTRAINING',
              description: 'In terms of fitness and training, everyone is unique. some people need one an one personal training programs, while others just want show up for a fitness class, group training options may be ideal for some and not others, the variety of training is key in creating a great fitness studio business.',
              iconName: 'Dumbbell',
              accentIconName: 'TrendingUp',
              bgColor: 'bg-bg-tert',
              order: 1
            },
            {
              id: '2',
              category: 'SOCIAL',
              title: 'THRIVING\nCOMMUNITY',
              description: "Human social relationships are essential to health and happiness. The studio is an ideal place to meet both physical and social needs. When we can create a sense of community and connection in our gyms. The key to building community is to increase member engagement as much as possible.",
              iconName: 'Users',
              accentIconName: 'Users',
              bgColor: 'bg-primary',
              bgImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600',
              order: 2
            },
            {
              id: '3',
              category: 'FACILITY',
              title: 'WELL-DESIGNED &\nDECENT',
              description: 'The location and quality of the facility is an interstate part of the fitness business. The facility is clean, tidy and small simple. Our facilities must match and remain consistent with our brand. Growth requires consistency. Loyal membership base.',
              iconName: 'PenTool',
              accentIconName: 'Settings',
              bgColor: 'bg-bg-tert',
              order: 3
            },
            {
              id: '4',
              category: 'EXPERTISE',
              title: 'FITNESS\nSPECIALIZATION',
              description: 'Fitness specialization means advanced knowledge in a specific field. Earning your certification in a specialized field of fitness offers many benefits. It enables us to provide a high level of service to customers, from exercise therapy to strength and conditioning.',
              iconName: 'ShieldCheck',
              accentIconName: 'Activity',
              bgColor: 'bg-bg-tert',
              order: 4
            },
            {
              id: '5',
              category: 'TECHNOLOGY',
              title: 'DIGITAL FITNESS\nPLATFORM',
              description: 'To stay ahead of the competition, we are bringing a hybrid fitness business with a digital fitness platform. Home fitness is being adopted as an effective and convenient way to exercise in the modern era.',
              iconName: 'Zap',
              accentIconName: 'Activity',
              bgColor: 'bg-primary',
              order: 5
            }
          ]);
        } else {
          setSpecs(specsList);
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
            <span className="text-white block">{data.headlinePrefix || 'CORE'}</span> 
            <span className="text-primary block">{data.title && data.title.includes('SPECIAL') ? 'PILLARS' : data.title}</span>
          </h2>
          <p className="max-w-[350px] text-[13px] text-text-sec text-left lg:text-right uppercase">
            {data.description}
          </p>
        </div>

        <div ref={cardsRef} className="flex flex-wrap justify-center gap-5">
          {specs.map((spec, index) => {
            const Icon = IconsMap[spec.iconName] || IconsMap['Dumbbell'];
            const AccentIcon = IconsMap[spec.accentIconName] || IconsMap['TrendingUp'];
            const isPrimary = spec.bgColor === 'bg-primary';

            return (
              <div 
                key={spec.id}
                className={`${spec.bgColor} p-10 pt-10 px-8 rounded relative overflow-hidden flex flex-col min-h-[380px] w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)] group reveal reveal-up ${cardsVisible ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-16 z-10">
                  <span className={`text-[10px] font-bold tracking-[1px] ${isPrimary ? 'text-white' : 'text-text-sec'}`}>
                    {spec.category}
                  </span>
                  {!isPrimary && (
                    <Icon className="absolute -top-5 -right-5 text-white/5 transition-transform duration-500 group-hover:scale-110" size={120} strokeWidth={0.5} />
                  )}
                </div>
                <h3 className={`text-[32px] italic my-5 mb-4 font-heading uppercase whitespace-pre-line ${isPrimary ? 'text-white' : ''} z-10 font-bold leading-tight`}>
                  {spec.title}
                </h3>
                <p className={`${isPrimary ? 'text-white/90' : 'text-text-sec'} text-sm flex-grow z-10 leading-relaxed font-medium`}>
                  {spec.description}
                </p>
                <AccentIcon className={`mt-8 ${isPrimary ? 'text-white' : 'text-primary'} z-10`} size={20} />
                
                {spec.bgImage && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${spec.bgImage}')` }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Specialization;
