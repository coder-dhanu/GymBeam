import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { Loader2, X, Maximize2, Camera } from 'lucide-react';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState({
    title: 'GALLERY',
    description: 'Explore the heart of GymBeam. Our facility, classes, and community in action.'
  });
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Header
        const headerRef = doc(db, 'settings', 'gallery');
        const headerSnap = await getDoc(headerRef);
        if (headerSnap.exists()) setHeader(headerSnap.data());

        // Fetch Images
        const galleryRef = collection(db, 'gallery_images');
        const q = query(galleryRef, orderBy('order', 'asc'));
        const snap = await getDocs(q);
        const imagesList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fallback for demo if collection is empty
        if (imagesList.length === 0) {
          const fallback = [
            { id: 'g1', url: '/src/assets/G1.jpeg', label: 'Transformation Session', category: 'Training' },
            { id: 'g2', url: '/src/assets/G2.jpeg', label: 'Independence Day Celebration', category: 'Community' },
            { id: 'g3', url: '/src/assets/G3.jpeg', label: 'Indoor Gym View', category: 'Facility' },
            { id: 'g4', url: '/src/assets/G4.jpeg', label: 'Outdoor Group Training', category: 'Classes' },
            { id: 'g5', url: '/src/assets/G5.jpeg', label: 'Member Community', category: 'Community' },
            { id: 'g6', url: '/src/assets/G6.jpeg', label: 'Equipment Showcase', category: 'Facility' },
          ];
          setImages(fallback);
        } else {
          setImages(imagesList);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-bg-dark min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-5 text-center overflow-hidden border-b border-white/5 min-h-[50vh] flex items-center justify-center">
        {header.heroImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={header.heroImage} 
              className="w-full h-full object-cover opacity-20" 
              alt="Gallery Background" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
          </div>
        )}
        {!header.heroImage && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 blur-[120px] w-full max-w-4xl h-full bg-primary rounded-full pointer-events-none"></div>
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
            <Camera size={14} className="text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{header.headlinePrefix || 'VISUAL JOURNEY'}</span>
          </div>
          <h1 className="text-6xl md:text-8xl italic font-bold mb-6 font-heading uppercase leading-tight tracking-tight">
            {header.title}
          </h1>
          <p className="text-text-sec text-lg max-w-2xl mx-auto uppercase tracking-[1px] opacity-60">
            {header.description}
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-[1400px] mx-auto px-5 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <div 
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-[#111111] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={img.url} 
                alt="Gym Gallery" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                 <Maximize2 size={32} className="text-white opacity-60 scale-75 group-hover:scale-100 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 uppercase tracking-[4px] text-xs font-bold leading-relaxed">
              No images found.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-5 md:p-10 animate-fade-in">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage.url} 
              alt="Full Size View" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
