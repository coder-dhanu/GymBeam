import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Save, Loader2, Image as ImageIcon, Plus, Edit2, Trash2, X, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminGallery = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [headerData, setHeaderData] = useState({
    headlinePrefix: 'VISUAL JOURNEY',
    title: 'GALLERY',
    description: 'Explore the heart of GymBeam. Our facility, classes, and community in action.',
    heroImage: ''
  });
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [itemForm, setItemForm] = useState({
    url: '',
    order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Header Settings
      const headerRef = doc(db, 'settings', 'gallery');
      const headerSnap = await getDoc(headerRef);
      if (headerSnap.exists()) setHeaderData(headerSnap.data());

      // Fetch Gallery Collection
      const galleryRef = collection(db, 'gallery_images');
      const q = query(galleryRef, orderBy('order', 'asc'));
      const snap = await getDocs(q);
      setImages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'gallery'), headerData);
      toast.success('Gallery header saved!');
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
      const id = editingId || `img_${Date.now()}`;
      await setDoc(doc(db, 'gallery_images', id), itemForm);
      toast.success(editingId ? 'Image updated!' : 'Image added to gallery!');
      setShowModal(false);
      setEditingId(null);
      setItemForm({ url: '', order: images.length });
      fetchData();
    } catch (error) {
      toast.error('Failed to save image');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this image from gallery?')) return;
    try {
      await deleteDoc(doc(db, 'gallery_images', id));
      toast.success('Image removed');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setItemForm({ ...item });
    setShowModal(true);
  };

  const bootstrapGallery = async () => {
    if (!window.confirm('This will populate the gallery with the G1-G6 images. Continue?')) return;
    setSaving(true);
    try {
      // Bootstrap Header
      await setDoc(doc(db, 'settings', 'gallery'), {
        headlinePrefix: 'VISUAL JOURNEY',
        title: 'GALLERY',
        description: 'Explore the heart of GymBeam. Our facility, classes, and community in action.',
        heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070'
      });

      const defaultImages = [
        { id: 'g1', url: '/src/assets/G1.jpeg', order: 1 },
        { id: 'g2', url: '/src/assets/G2.jpeg', order: 2 },
        { id: 'g3', url: '/src/assets/G3.jpeg', order: 3 },
        { id: 'g4', url: '/src/assets/G4.jpeg', order: 4 },
        { id: 'g5', url: '/src/assets/G5.jpeg', order: 5 },
        { id: 'g6', url: '/src/assets/G6.jpeg', order: 6 },
      ];

      for (const img of defaultImages) {
        const { id, ...data } = img;
        await setDoc(doc(db, 'gallery_images', id), data);
      }
      toast.success('Gallery bootstrapped successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to bootstrap gallery');
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
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">Gallery Manager</h1>
          <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
            Curate the visual story of GymBeam. Manage facility photos and action captures.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={bootstrapGallery} disabled={saving}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-lg font-bold text-xs transition-all border border-white/5"
          >
            <RefreshCw size={14} className={saving ? 'animate-spin' : ''} /> BOOTSTRAP G1-G6
          </button>
          <button 
            type="button"
            onClick={() => { setEditingId(null); setItemForm({ url: '', order: images.length }); setShowModal(true); }}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
          >
            <Plus size={18} /> ADD PHOTO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Header Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="text-primary" size={18} />
              <h2 className="text-lg font-bold text-white uppercase">Section Header</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Headline Prefix</label>
                <input 
                  type="text" value={headerData.headlinePrefix} 
                  onChange={(e) => setHeaderData({...headerData, headlinePrefix: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Gallery Title</label>
                <input 
                  type="text" value={headerData.title} 
                  onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Hero Background URL (Optional)</label>
                <input 
                  type="text" value={headerData.heroImage} 
                  onChange={(e) => setHeaderData({...headerData, heroImage: e.target.value})}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="e.g. Unsplash dynamic URL"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Main Description</label>
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

        {/* Images List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((img) => (
              <div key={img.id} className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden group">
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <img src={img.url} alt="Gallery Item" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2 w-full justify-end">
                      <button onClick={() => openEdit(img)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(img.id)} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm">Image #{img.order}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-white/20">ORDER: {img.order}</span>
                </div>
              </div>
            ))}
            {images.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-white/20 uppercase tracking-[3px] text-xs font-bold">No Photos in Gallery</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
          <div className="bg-[#111111] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">{editingId ? 'Edit Photo' : 'Add Photo'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-8 space-y-6">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Image URL (or local path)</label>
                <input type="text" value={itemForm.url} required onChange={(e) => setItemForm({...itemForm, url: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-primary/40 block" placeholder="/src/assets/G1.jpeg" />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Display Order</label>
                <input type="number" value={itemForm.order} onChange={(e) => setItemForm({...itemForm, order: parseInt(e.target.value)})} className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-primary/40" />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" disabled={saving}
                  className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white p-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  {editingId ? 'Save Changes' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
