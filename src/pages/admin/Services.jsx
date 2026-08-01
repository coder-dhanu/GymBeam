import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Save, Loader2, Activity, Plus, Edit2, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: 'OUR SERVICES',
    description: 'Manage the gym classes, personal training options, and amenities offered by GymBeam.'
  });
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [itemForm, setItemForm] = useState({
    title: '',
    desc: '',
    linkText: 'LEARN MORE',
    order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Header Settings
      const headerRef = doc(db, 'settings', 'services');
      const headerSnap = await getDoc(headerRef);
      if (headerSnap.exists()) {
        setHeaderData(headerSnap.data());
      }

      // Fetch Collection
      const servicesRef = collection(db, 'services');
      const q = query(servicesRef, orderBy('order', 'asc'));
      const servicesSnap = await getDocs(q);
      const servicesList = servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services data:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'services'), headerData);
      toast.success('Header settings saved!');
    } catch (error) {
      toast.error('Failed to save header');
    } finally {
      setSaving(false);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const id = editingId || `service_${Date.now()}`;
      await setDoc(doc(db, 'services', id), itemForm);
      toast.success(editingId ? 'Service updated!' : 'Service created!');
      setShowModal(false);
      setEditingId(null);
      setItemForm({ title: '', desc: '', linkText: 'LEARN MORE', order: services.length });
      fetchData();
    } catch (error) {
      toast.error('Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this service from the list?')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      toast.success('Service removed');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setItemForm({ ...item });
    setShowModal(true);
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
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">Service Management</h1>
          <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
            Manage your individual gym services, classes, and performance programs.
          </p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setItemForm({ title: '', desc: '', linkText: 'LEARN MORE', order: services.length }); setShowModal(true); }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
        >
          <Plus size={18} /> ADD NEW SERVICE
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Header Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-primary" size={18} />
              <h2 className="text-lg font-bold text-white uppercase">Section Header</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Section Title</label>
                <input 
                  type="text" value={headerData.title} 
                  onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
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

        {/* Services List */}
        <div className="lg:col-span-2 space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-[#111111] p-5 rounded-xl border border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-white/50">
                  <span className="text-xs font-bold">{service.order + 1}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase text-lg">{service.title}</h3>
                  <p className="text-white/30 text-xs mt-1 line-clamp-1 max-w-md">{service.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(service)} className="p-2 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-red-500/10 rounded text-white/40 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="text-center py-10 text-white/20 uppercase tracking-widest text-xs">No services listed yet.</p>}
        </div>
      </div>

      {/* Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
          <div className="bg-[#111111] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white uppercase">{editingId ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Service Title</label>
                <input type="text" value={itemForm.title} required onChange={(e) => setItemForm({...itemForm, title: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" placeholder="e.g. GROUP CLASSES" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Short Description</label>
                <textarea value={itemForm.desc} required rows="3" onChange={(e) => setItemForm({...itemForm, desc: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Button Text</label>
                  <input type="text" value={itemForm.linkText} onChange={(e) => setItemForm({...itemForm, linkText: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" placeholder="LEARN MORE" />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">List Order</label>
                  <input type="number" value={itemForm.order} onChange={(e) => setItemForm({...itemForm, order: parseInt(e.target.value)})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none" />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" disabled={saving}
                  className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white p-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                  {editingId ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Services;
