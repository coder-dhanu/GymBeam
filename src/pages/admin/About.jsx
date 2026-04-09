import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Info } from 'lucide-react';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    visionTitle: 'THE EVOLUTION OF PERFORMANCE',
    visionDescription: 'Empower individuals to transform their lives through fitness, fostering a supportive community where everyone can achieve their full potential.',
    visionImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000',
    missionTitle: 'FORGING CAPABILITY',
    missionDescription: 'Provide a unique atmosphere to enhance movement development through progressive programming, specialized coaching, and high-performance equipment.',
    missionImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000'
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const docRef = doc(db, 'settings', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await setDoc(doc(db, 'settings', 'about'), formData);
      setMessage({ type: 'success', text: 'About changes saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error("Error saving about data:", error);
      setMessage({ type: 'error', text: 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">About Us Section</h1>
        <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
          Manage your gym's vision, mission, and storytelling elements.
        </p>
        <div className="w-full h-px bg-white/5 mt-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {message.text && (
          <div className={`p-4 rounded-lg text-sm font-semibold transition-all ${
            message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        {/* Vision Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Our Vision</h2>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Vision Title</label>
            <input 
              type="text" name="visionTitle" value={formData.visionTitle} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Vision Description</label>
            <textarea 
              name="visionDescription" value={formData.visionDescription} onChange={handleChange} rows="3"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Vision Image URL</label>
            <input 
              type="text" name="visionImage" value={formData.visionImage} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mission Title</label>
            <input 
              type="text" name="missionTitle" value={formData.missionTitle} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mission Description</label>
            <textarea 
              name="missionDescription" value={formData.missionDescription} onChange={handleChange} rows="3"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mission Image URL</label>
            <input 
              type="text" name="missionImage" value={formData.missionImage} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" disabled={saving}
            className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default About;
