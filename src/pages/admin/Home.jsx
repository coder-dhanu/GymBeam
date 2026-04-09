

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    heroTitleLine1: 'TRANSFORM',
    heroTitleLine2: 'YOUR',
    heroTitleLine3: 'POTENTIAL',
    heroDescription: "Elite training for toddlers to adults. Join the community of strength and redefine what's possible for your body.",
    heroBtn1Text: 'START YOUR JOURNEY',
    heroBtn2Text: 'VIEW PROGRAMS',
    heroBgText: 'BEAM',
    heroBgImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070'
  });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const docRef = doc(db, 'settings', 'hero');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
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
      await setDoc(doc(db, 'settings', 'hero'), formData);
      setMessage({ type: 'success', text: 'Home changes saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error("Error saving hero data:", error);
      setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
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
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">Home Section</h1>
        <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
          Manage the hero section content, call-to-action buttons, and background visuals.
        </p>
        <div className="w-full h-px bg-white/5 mt-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {message.text && (
          <div className={`p-4 rounded-lg text-sm font-semibold transition-all ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
            {message.text}
          </div>
        )}

        {/* Hero Content Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <HomeIcon className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Hero Content</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Title Line 1</label>
              <input
                type="text" name="heroTitleLine1" value={formData.heroTitleLine1} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="TRANSFORM"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Title Line 2</label>
              <input
                type="text" name="heroTitleLine2" value={formData.heroTitleLine2} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="YOUR"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Title Line 3</label>
              <input
                type="text" name="heroTitleLine3" value={formData.heroTitleLine3} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="POTENTIAL"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Description</label>
            <textarea
              name="heroDescription" value={formData.heroDescription} onChange={handleChange} rows="3"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Enter hero description..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Button 1 Text</label>
              <input
                type="text" name="heroBtn1Text" value={formData.heroBtn1Text} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Button 2 Text</label>
              <input
                type="text" name="heroBtn2Text" value={formData.heroBtn2Text} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Visual Settings Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Visual Settings</h2>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Background Accent Text</label>
            <input
              type="text" name="heroBgText" value={formData.heroBgText} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="e.g. BEAM"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Background Image URL</label>
            <input
              type="text" name="heroBgImage" value={formData.heroBgImage} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Unsplash image URL..."
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

export default Home;
