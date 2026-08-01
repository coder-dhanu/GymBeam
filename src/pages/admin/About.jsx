import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    aboutTitle: 'Our Story',
    aboutHeadline: 'The Beam of Human Potential',
    aboutParagraph: 'Just as a building needs a beam, a person needs a gym in this busy life. This fundamental concept led to the launch of GYMBEAM. As a civil engineer by profession, I believe an engineer\'s true purpose is to make life more comfortable and structural—a philosophy we apply directly to your fitness journey. GYMBEAM was born from a collaboration with professional bodybuilder Mr. Shubham Dhole. As a passionate fitness coach, I focus on empowering you to execute daily activities with optimal performance, endurance, and strength while effectively managing stress, fatigue, and sedentary behavior across our brand in India.',
    aboutImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    visionTitle: 'VISION',
    visionDescription: 'Our vision is to empower individuals transform their lives through fitness fostering a community of strength, wellness & personal growth.',
    missionTitle: 'MISSION',
    missionDescription: 'Our mission is to provide a unique atmosphere to enhance movement development through health and fitness for toddlers, children, teens and families for a promotion life long wellness.',
  });

  useEffect(() => {
    // Temporarily disabled fetch to force new defaults. Click 'SAVE' to update database.
    // fetchAboutData(); 
    setLoading(false);
  }, []);

  const fetchAboutData = async () => {
    try {
      const docRef = doc(db, 'settings', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(prev => ({ ...prev, ...docSnap.data() }));
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
    try {
      await setDoc(doc(db, 'settings', 'about'), formData);
      toast.success('About changes saved successfully!');
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error('Failed to save changes.');
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
          Manage your gym's brand story, structural philosophy, vision, and mission.
        </p>
        <div className="w-full h-px bg-white/5 mt-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-10">
        {/* Intro Story Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Our Story (Founder's Concept)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Small Label (e.g. Our Story)</label>
              <input 
                type="text" name="aboutTitle" value={formData.aboutTitle} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="OUR STORY"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Main Headline</label>
              <input 
                type="text" name="aboutHeadline" value={formData.aboutHeadline} onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="THE BEAM OF HUMAN POTENTIAL"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Story Paragraph</label>
            <textarea 
              name="aboutParagraph" value={formData.aboutParagraph} onChange={handleChange} rows="6"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors leading-relaxed"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Story Image URL</label>
            <input 
              type="text" name="aboutImage" value={formData.aboutImage} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Vision</h2>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Vision Title</label>
            <input 
              type="text" name="visionTitle" value={formData.visionTitle} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Vision Description</label>
            <textarea 
              name="visionDescription" value={formData.visionDescription} onChange={handleChange} rows="3"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            ></textarea>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Mission</h2>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mission Title</label>
            <input 
              type="text" name="missionTitle" value={formData.missionTitle} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mission Description</label>
            <textarea 
              name="missionDescription" value={formData.missionDescription} onChange={handleChange} rows="3"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            ></textarea>
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
