import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { Check, ArrowRight, Loader2, CreditCard, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MembershipPlans = () => {
  const [activeCategory, setActiveCategory] = useState('Group Training');
  const [plans, setPlans] = useState([]);
  const [header, setHeader] = useState({
    title: 'MEMBERSHIP PLANS',
    description: 'Explore our flexible membership options designed to fit your fitness journey and lifestyle.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Header
        const headerRef = doc(db, 'settings', 'membership');
        const headerSnap = await getDoc(headerRef);
        if (headerSnap.exists()) setHeader(headerSnap.data());

        // Fetch Plans
        const plansRef = collection(db, 'membership_plans');
        const q = query(plansRef, orderBy('order', 'asc'));
        const snap = await getDocs(q);
        const plansList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fallback for user's specific request
        if (plansList.length === 0) {
          setPlans([
            // Group Training
            { id: 'g1', title: '1 Month', price: '2,000', category: 'Group Training', features: 'Access to all classes\nDedicated Coach\nStandard Locker', order: 1 },
            { id: 'g3', title: '3 Months', price: '5,000', category: 'Group Training', features: 'Access to all classes\nDedicated Coach\nStandard Locker', order: 2, isPopular: true },
            { id: 'g6', title: '6 Months', price: '8,000', category: 'Group Training', features: 'Access to all classes\nDedicated Coach\nPremium Locker', order: 3 },
            { id: 'g12', title: '12 Months', price: '12,000', category: 'Group Training', features: 'Access to all classes\nDedicated Coach\nVIP Locker', order: 4 },
            // Personal Training
            { id: 'p1', title: '1 Month', price: '5,000', category: 'Personal Training', features: 'One-on-One Coaching\nCustom Diet Plan\nPerformance Metrics', order: 5 },
            { id: 'p3', title: '3 Months', price: '12,000', category: 'Personal Training', features: 'One-on-One Coaching\nCustom Diet Plan\nPerformance Metrics', order: 6, isPopular: true }
          ]);
        } else {
          setPlans(plansList);
        }
      } catch (error) {
        console.error("Error fetching membership data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPlans = plans.filter(p => p.category === activeCategory);

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
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={header.heroImage || "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070"} 
            className="w-full h-full object-cover opacity-30" 
            alt="Gym Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <span className="text-primary font-bold tracking-[3px] uppercase text-xs mb-4 block animate-fade-in">PREMIUM ACCESS</span>
          <h1 className="text-6xl md:text-8xl italic font-bold mb-6 font-heading uppercase leading-tight animate-blur-in tracking-tight">
            {header.title}
          </h1>
          <p className="text-text-sec text-lg max-w-2xl mx-auto animate-fade-in-up">
            {header.description}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pb-32 px-5 max-w-[1280px] mx-auto -mt-20 relative z-20">
        
        {/* Category Toggles */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#111111]/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 inline-flex shadow-2xl">
            {['Group Training', 'Personal Training'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'Group Training' ? <Users size={16} /> : <Star size={16} />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan, idx) => (
            <div 
              key={plan.id}
              className={`relative bg-[#0F0F0F] rounded-2xl border border-white/5 p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 group ${
                plan.isPopular ? 'ring-2 ring-primary ring-offset-4 ring-offset-bg-dark' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-[1px] shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] block mb-2">ACCESS DURATION</span>
                <h3 className="text-3xl italic font-bold text-white font-heading uppercase">{plan.title}</h3>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary italic font-heading">₹</span>
                  <span className="text-5xl font-bold text-white font-heading tracking-tighter">{plan.price}</span>
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[1px] mt-1 block">One-time payment</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features?.split('\n').map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-[13px] text-text-sec">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/contact"
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  plan.isPopular 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98]' 
                  : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                JOIN NOW <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-20 text-center">
          <p className="text-white/20 text-[11px] uppercase tracking-[2px] max-w-xl mx-auto leading-relaxed italic">
            {header.bottomNote || "* All membership plans include initial consultation, free assessment, and access to all standard facilities. Taxes may apply."}
          </p>
        </div>

      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bg-sec border-t border-white/5">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl italic font-bold mb-6 font-heading uppercase tracking-tight">{header.ctaTitle || "Need a custom plan?"}</h2>
          <p className="text-text-sec mb-10 max-w-lg mx-auto uppercase text-xs tracking-[1px] leading-relaxed">
            {header.ctaDescription || "We provide specialized corporate packages and high-performance athlete preparatory programs upon request."}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-bg-dark px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all active:scale-[0.98]">
            <CreditCard size={18} /> CONTACT SALES
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MembershipPlans;
