import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MembershipPlans = () => {
  const [data, setData] = useState({
    title: 'MEMBERSHIP PLANS',
    description: 'Explore our flexible membership options designed to fit your fitness journey and lifestyle. Detailed plans are coming soon!'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'membership');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching membership data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div 
      className="pt-40 min-h-screen bg-bg-sec flex flex-col items-center justify-center text-center px-5 transition-opacity duration-1000"
      style={{ opacity: loading ? 0 : 1 }}
    >
      <h1 className="text-6xl font-bold mb-5 italic font-heading uppercase leading-tight">{data.title}</h1>
      <p className="text-xl text-text-sec max-w-2xl">
        {data.description}
      </p>
    </div>
  );
};

export default MembershipPlans;
