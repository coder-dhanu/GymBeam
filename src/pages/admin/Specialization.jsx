import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Save, Loader2, Award, Plus, Edit2, Trash2, X, MoveUp, MoveDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Specialization = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [headerData, setHeaderData] = useState({
    headlinePrefix: 'CORE',
    title: 'SPECIALIZATIONS',
    description: 'Highlight your gym\'s expertise in specific workout domains and training techniques.',
    heroImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070',
    heroTitle: 'CORE SPECIALIZATIONS',
    heroSubtitle: 'Expert-led training programs designed for elite performance.'
  });
  const [specs, setSpecs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [itemForm, setItemForm] = useState({
    category: '',
    title: '',
    description: '',
    iconName: 'Dumbbell',
    accentIconName: 'TrendingUp',
    bgColor: 'bg-bg-tert',
    bgImage: '',
    order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Header
      const headerRef = doc(db, 'settings', 'specialization');
      const headerSnap = await getDoc(headerRef);
      if (headerSnap.exists()) {
        setHeaderData(headerSnap.data());
      }

      // Fetch Collection
      const specsRef = collection(db, 'specializations');
      const q = query(specsRef, orderBy('order', 'asc'));
      const specsSnap = await getDocs(q);
      const specsList = specsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSpecs(specsList);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load specialization data");
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'specialization'), headerData);
      toast.success('Header settings saved!');
    } catch (error) {
      toast.error('Failed to save header settings');
    } finally {
      setSaving(false);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const id = editingId || `spec_${Date.now()}`;
      await setDoc(doc(db, 'specializations', id), itemForm);
      toast.success(editingId ? 'Item updated!' : 'Item added!');
      setShowModal(false);
      setEditingId(null);
      setItemForm({ category: '', title: '', description: '', iconName: 'Dumbbell', accentIconName: 'TrendingUp', bgColor: 'bg-bg-tert', bgImage: '', order: specs.length });
      fetchData();
    } catch (error) {
      toast.error('Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pillar?')) return;
    try {
      await deleteDoc(doc(db, 'specializations', id));
      toast.success('Item deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setItemForm({ ...item });
    setShowModal(true);
  };

  const bootstrapSpecs = async () => {
    if (!window.confirm('This will populate your database with the 5 new Specialization pillars. Continue?')) return;
    setSaving(true);
    try {
      // Bootstrap Header
      await setDoc(doc(db, 'settings', 'specialization'), {
        headlinePrefix: 'CORE',
        title: 'SPECIALIZATIONS',
        description: 'Highlight your gym\'s expertise in specific workout domains and training techniques.',
        heroImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070',
        heroTitle: 'CORE PILLARS',
        heroSubtitle: 'Thrive with our specialized training domains and expert coaching staff.'
      });

      const defaultSpecs = [
        { id: 'spec_1', category: 'TRAINING', title: 'VARIETY OF\nTRAINING', description: 'In terms of fitness and training, everyone is unique. some people need one an one personal training programs, while others just want show up for a fitness class, group training options may be ideal for some and not others, the variety of training is key in creating a great fitness studio business.', iconName: 'Dumbbell', accentIconName: 'TrendingUp', bgColor: 'bg-bg-tert', order: 1 },
        { id: 'spec_2', category: 'SOCIAL', title: 'THRIVING\nCOMMUNITY', description: "Human social relationships are essential to health and happiness. The studio is an ideal place to meet both physical and social needs. When we can create a sense of community and connection in our gyms. The key to building community is to increase member engagement as much as possible.", iconName: 'Users', accentIconName: 'Users', bgColor: 'bg-primary', bgImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600', order: 2 },
        { id: 'spec_3', category: 'FACILITY', title: 'WELL-DESIGNED &\nDECENT', description: 'The location and quality of the facility is an interstate part of the fitness business. The facility is clean, tidy and small simple. Our facilities must match and remain consistent with our brand. Growth requires consistency. Loyal membership base.', iconName: 'PenTool', accentIconName: 'Settings', bgColor: 'bg-bg-tert', order: 3 },
        { id: 'spec_4', category: 'EXPERTISE', title: 'FITNESS\nSPECIALIZATION', description: 'Fitness specialization means advanced knowledge in a specific field. Earning your certification in a specialized field of fitness offers many benefits. It enables us to provide a high level of service to customers, from exercise therapy to strength and conditioning.', iconName: 'ShieldCheck', accentIconName: 'Activity', bgColor: 'bg-bg-tert', order: 4 },
        { id: 'spec_5', category: 'TECHNOLOGY', title: 'DIGITAL FITNESS\nPLATFORM', description: 'To stay ahead of the competition, we are bringing a hybrid fitness business with a digital fitness platform. Home fitness is being adopted as an effective and convenient way to exercise in the modern era.', iconName: 'Zap', accentIconName: 'Activity', bgColor: 'bg-primary', order: 5 }
      ];

      for (const spec of defaultSpecs) {
        const { id, ...data } = spec;
        await setDoc(doc(db, 'specializations', id), data);
      }

      toast.success('Successfully bootstrapped all specialization pillars!');
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Failed to bootstrap pillars.');
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
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">Specialization Pillars</h1>
          <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
            Manage your gym's core pillars, expert domains, and facilities.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={bootstrapSpecs} disabled={saving}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-lg font-bold text-xs transition-all border border-white/5"
          >
            BOOTSTRAP DEFAULT DATA
          </button>
          <button 
            onClick={() => { setEditingId(null); setItemForm({ category: '', title: '', description: '', iconName: 'Dumbbell', accentIconName: 'TrendingUp', bgColor: 'bg-bg-tert', bgImage: '', order: specs.length }); setShowModal(true); }}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
          >
            <Plus size={18} /> ADD NEW PILLAR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Header Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-primary" size={18} />
              <h2 className="text-lg font-bold text-white uppercase">Section Header</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Headline Prefix</label>
                <input 
                  type="text" value={headerData.headlinePrefix} 
                  onChange={(e) => setHeaderData({...headerData, headlinePrefix: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                  placeholder="e.g. CORE"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Main Title</label>
                <input 
                  type="text" value={headerData.title} 
                  onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Section Hero Background URL</label>
                <input 
                  type="text" value={headerData.heroImage} 
                  onChange={(e) => setHeaderData({...headerData, heroImage: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                  placeholder="Unsplash URL"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Hero Title</label>
                <input 
                  type="text" value={headerData.heroTitle} 
                  onChange={(e) => setHeaderData({...headerData, heroTitle: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Description</label>
                <textarea 
                  value={headerData.description} rows="3"
                  onChange={(e) => setHeaderData({...headerData, description: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                ></textarea>
              </div>
              <button 
                onClick={handleHeaderSave} disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE HEADER
              </button>
            </div>
          </div>
        </div>

        {/* Pillars List */}
        <div className="lg:col-span-2 space-y-4">
          {specs.map((item) => (
            <div key={item.id} className="bg-[#111111] p-5 rounded-xl border border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 ${item.bgColor === 'bg-primary' ? 'bg-primary' : 'bg-white/5'} rounded flex items-center justify-center text-white/50`}>
                  <span className="text-xs font-bold">{item.order + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[1px]">{item.category}</span>
                  </div>
                  <h3 className="text-white font-bold uppercase text-lg line-clamp-1">{item.title.replace('\n', ' ')}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="p-2 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded text-white/40 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {specs.length === 0 && <p className="text-center py-10 text-white/20 uppercase tracking-widest text-xs">No pillars found. Click "Add New" to start.</p>}
        </div>
      </div>

      {/* Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
          <div className="bg-[#111111] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white uppercase">{editingId ? 'Edit Pillar' : 'Add New Pillar'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Category Label</label>
                  <input type="text" value={itemForm.category} required onChange={(e) => setItemForm({...itemForm, category: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" placeholder="e.g. STRENGTH" />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Order</label>
                  <input type="number" value={itemForm.order} onChange={(e) => setItemForm({...itemForm, order: parseInt(e.target.value)})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Title (use \n for line break)</label>
                <input type="text" value={itemForm.title} required onChange={(e) => setItemForm({...itemForm, title: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" placeholder="e.g. VARIETY OF\nTRAINING" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Description</label>
                <textarea value={itemForm.description} required rows="3" onChange={(e) => setItemForm({...itemForm, description: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Main Icon</label>
                  <select value={itemForm.iconName} onChange={(e) => setItemForm({...itemForm, iconName: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none">
                    <option value="Dumbbell">Dumbbell</option>
                    <option value="Users">Users</option>
                    <option value="PenTool">PenTool</option>
                    <option value="Activity">Activity</option>
                    <option value="ShieldCheck">ShieldCheck</option>
                  </select>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">BG Color</label>
                  <select value={itemForm.bgColor} onChange={(e) => setItemForm({...itemForm, bgColor: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none">
                    <option value="bg-bg-tert">Secondary (Dark)</option>
                    <option value="bg-primary">Primary (Pink)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Background Image URL (Optional)</label>
                <input type="text" value={itemForm.bgImage} onChange={(e) => setItemForm({...itemForm, bgImage: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" disabled={saving}
                  className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white p-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                  {editingId ? 'Save Changes' : 'Create Pillar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Specialization;
