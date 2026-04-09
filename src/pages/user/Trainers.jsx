import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Trainers = () => {
  const [data, setData] = useState({
    title: 'TRAINERS',
    description: 'Meet our world-class trainers dedicated to helping you achieve your full potential. Page content is coming soon!'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'trainers');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching trainers data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div 
      className="pt-40 min-h-screen bg-bg-dark flex flex-col items-center justify-center text-center px-5 transition-opacity duration-1000"
      style={{ opacity: loading ? 0 : 1 }}
    >
      <h1 className="text-6xl font-bold mb-5 italic font-heading uppercase leading-tight">{data.title}</h1>
      <p className="text-xl text-text-sec max-w-2xl uppercase">
        {data.description}
      </p>
    </div>
  );
};

export default Trainers;
