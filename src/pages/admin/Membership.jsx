import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Save,
  Loader2,
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  X,
  Star,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Membership = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: "MEMBERSHIP PLANS",
    description:
      "Explore our flexible membership options designed to fit your fitness journey and lifestyle.",
    heroImage:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070",
    bottomNote:
      "* All membership plans include initial consultation, free assessment, and access to all standard facilities. Taxes may apply.",
    ctaTitle: "Need a custom plan?",
    ctaDescription:
      "We provide specialized corporate packages and high-performance athlete preparatory programs upon request.",
  });
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [itemForm, setItemForm] = useState({
    title: "", // e.g. 1 Month
    price: "", // e.g. 2,000
    category: "Group Training", // Group Training or Personal Training
    features: "", // Comma separated featurespn
    order: 0,
    isPopular: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Header
      const headerRef = doc(db, "settings", "membership");
      const headerSnap = await getDoc(headerRef);
      if (headerSnap.exists()) setHeaderData(headerSnap.data());

      // Fetch Collection
      const plansRef = collection(db, "membership_plans");
      const q = query(plansRef, orderBy("order", "asc"));
      const snap = await getDocs(q);
      setPlans(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching membership data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHeaderSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "membership"), headerData);
      toast.success("Header settings saved!");
    } catch (error) {
      toast.error("Failed to save header");
    } finally {
      setSaving(false);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const id = editingId || `plan_${Date.now()}`;
      await setDoc(doc(db, "membership_plans", id), itemForm);
      toast.success(editingId ? "Plan updated!" : "Plan added!");
      setShowModal(false);
      setEditingId(null);
      setItemForm({
        title: "",
        price: "",
        category: "Group Training",
        features: "",
        order: plans.length,
        isPopular: false,
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to save plan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this membership tier?")) return;
    try {
      await deleteDoc(doc(db, "membership_plans", id));
      toast.success("Plan removed");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete plan");
    }
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setItemForm({ ...item });
    setShowModal(true);
  };

  const bootstrapPlans = async () => {
    if (
      !window.confirm(
        "This will populate the database with your default Group and Personal training plans. Continue?",
      )
    )
      return;
    setSaving(true);
    try {
      // 1. Set Header
      await setDoc(doc(db, "settings", "membership"), {
        title: "MEMBERSHIP PLANS",
        description:
          "Explore our flexible membership options designed to fit your fitness journey and lifestyle.",
        heroImage:
          "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070",
        bottomNote:
          "* All membership plans include initial consultation, free assessment, and access to all standard facilities. Taxes may apply.",
        ctaTitle: "Need a custom plan?",
        ctaDescription:
          "We provide specialized corporate packages and high-performance athlete preparatory programs upon request.",
      });

      // 2. Set Collection
      const defaultPlans = [
        {
          id: "g1",
          title: "1 Month",
          price: "2,000",
          category: "Group Training",
          features: "Access to all classes\nDedicated Coach\nStandard Locker",
          order: 1,
        },
        {
          id: "g3",
          title: "3 Months",
          price: "5,000",
          category: "Group Training",
          features: "Access to all classes\nDedicated Coach\nStandard Locker",
          order: 2,
          isPopular: true,
        },
        {
          id: "g6",
          title: "6 Months",
          price: "8,000",
          category: "Group Training",
          features: "Access to all classes\nDedicated Coach\nPremium Locker",
          order: 3,
        },
        {
          id: "g12",
          title: "12 Months",
          price: "12,000",
          category: "Group Training",
          features: "Access to all classes\nDedicated Coach\nVIP Locker",
          order: 4,
        },
        {
          id: "p1",
          title: "1 Month",
          price: "5,000",
          category: "Personal Training",
          features:
            "One-on-One Coaching\nCustom Diet Plan\nPerformance Metrics",
          order: 5,
        },
        {
          id: "p3",
          title: "3 Months",
          price: "12,000",
          category: "Personal Training",
          features:
            "One-on-One Coaching\nCustom Diet Plan\nPerformance Metrics",
          order: 6,
          isPopular: true,
        },
      ];

      for (const plan of defaultPlans) {
        const { id, ...data } = plan;
        await setDoc(doc(db, "membership_plans", id), data);
      }

      toast.success("Successfully bootstrapped all plans!");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to bootstrap plans.");
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
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">
            Membership Manager
          </h1>
          <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
            Manage training packages, durations, and dynamic pricing for your
            members.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={bootstrapPlans}
            disabled={saving}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-lg font-bold text-xs transition-all border border-white/5"
          >
            BOOTSTRAP DEFAULT DATA
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setItemForm({
                title: "",
                price: "",
                category: "Group Training",
                features: "",
                order: plans.length,
                isPopular: false,
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
          >
            <Plus size={18} /> ADD NEW PLAN
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Header Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="text-primary" size={18} />
              <h2 className="text-lg font-bold text-white uppercase">
                Section Header
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  Section Title
                </label>
                <input
                  type="text"
                  value={headerData.title}
                  onChange={(e) =>
                    setHeaderData({ ...headerData, title: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  Hero Background Image URL
                </label>
                <input
                  type="text"
                  value={headerData.heroImage}
                  onChange={(e) =>
                    setHeaderData({ ...headerData, heroImage: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  Bottom Disclaimer Note
                </label>
                <textarea
                  value={headerData.bottomNote}
                  rows="2"
                  onChange={(e) =>
                    setHeaderData({ ...headerData, bottomNote: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                ></textarea>
              </div>
              <div className="pt-4 border-t border-white/5 mt-4">
                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                  Custom CTA Section
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      CTA Title
                    </label>
                    <input
                      type="text"
                      value={headerData.ctaTitle}
                      onChange={(e) =>
                        setHeaderData({
                          ...headerData,
                          ctaTitle: e.target.value,
                        })
                      }
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      CTA Description
                    </label>
                    <textarea
                      value={headerData.ctaDescription}
                      rows="2"
                      onChange={(e) =>
                        setHeaderData({
                          ...headerData,
                          ctaDescription: e.target.value,
                        })
                      }
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                onClick={handleHeaderSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}{" "}
                SAVE HEADER
              </button>
            </div>
          </div>
        </div>

        {/* Plans List */}
        <div className="lg:col-span-2 space-y-8">
          {["Group Training", "Personal Training"].map((cat) => (
            <div key={cat} className="space-y-4">
              <h3 className="text-sm font-bold text-primary tracking-widest uppercase border-b border-primary/20 pb-2">
                {cat}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {plans
                  .filter((p) => p.category === cat)
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-[#111111] p-4 rounded-xl border border-white/5 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center text-white/50">
                          <span className="text-xs font-bold">
                            {plan.order + 1}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-bold uppercase">
                              {plan.title}
                            </h4>
                            {plan.isPopular && (
                              <Star
                                size={12}
                                className="text-yellow-500 fill-yellow-500"
                              />
                            )}
                          </div>
                          <p className="text-primary text-xs font-bold mt-1">
                            ₹{plan.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(plan)}
                          className="p-2 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="p-2 hover:bg-red-500/10 rounded text-white/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                {plans.filter((p) => p.category === cat).length === 0 && (
                  <p className="text-[10px] text-white/20 uppercase tracking-widest text-center py-4">
                    No {cat} plans added.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
          <div className="bg-[#111111] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white uppercase">
                {editingId ? "Edit Plan" : "New Plan"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    Membership Type
                  </label>
                  <select
                    value={itemForm.category}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, category: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                  >
                    <option value="Group Training">Group Training</option>
                    <option value="Personal Training">Personal Training</option>
                  </select>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    Duration Label
                  </label>
                  <input
                    type="text"
                    value={itemForm.title}
                    required
                    onChange={(e) =>
                      setItemForm({ ...itemForm, title: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                    placeholder="e.g. 1 Month"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    Price (Numeric String)
                  </label>
                  <input
                    type="text"
                    value={itemForm.price}
                    required
                    onChange={(e) =>
                      setItemForm({ ...itemForm, price: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                    placeholder="e.g. 2,000"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    List Order
                  </label>
                  <input
                    type="number"
                    value={itemForm.order}
                    onChange={(e) =>
                      setItemForm({
                        ...itemForm,
                        order: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  Features (One per line)
                </label>
                <textarea
                  value={itemForm.features}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, features: e.target.value })
                  }
                  rows="3"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none"
                  placeholder="Access to gym&#10;Locker availability"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  checked={itemForm.isPopular}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, isPopular: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/10 bg-[#0A0A0A] text-primary focus:ring-primary"
                />
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                  Mark as Most Popular
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white p-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {editingId ? "Save Changes" : "Add Membership Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Membership;
