import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Award } from 'lucide-react';

const Specialization = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    title: 'SPECIALIZATIONS',
    description: 'Highlight your gym\'s expertise in specific workout domains and training techniques.'
  });

  useEffect(() => {
    fetchSpecializationData();
  }, []);

  const fetchSpecializationData = async () => {
    try {
      const docRef = doc(db, 'settings', 'specialization');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching specialization data:", error);
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
      await setDoc(doc(db, 'settings', 'specialization'), formData);
      setMessage({ type: 'success', text: 'Specialization info saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error("Error saving specialization data:", error);
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
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">Specialization Settings</h1>
        <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
          Manage the introductory content for your gym's expert training domains.
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

        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-white">Section Header</h2>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Main Title</label>
            <input 
              type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold text-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Description</label>
            <textarea 
              name="description" value={formData.description} onChange={handleChange} rows="4"
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

export default Specialization;
