import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import {
  Home as HomeIcon,
  Info,
  Users,
  Image as ImageIcon,
  Mail,
  CreditCard,
  Activity,
  Target,
  LogOut,
  ChevronLeft,
  Check,
  X
} from 'lucide-react';
import logo from '../../assets/gymbeam_logo.png';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAdmin');
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const navItems = [
    { name: 'Home', path: '/admin', icon: HomeIcon },
    { name: 'About', path: '/admin/about', icon: Info },
    { name: 'Trainers', path: '/admin/trainers', icon: Users },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Contact', path: '/admin/contact', icon: Mail },
    { name: 'Membership', path: '/admin/membership', icon: CreditCard },
    { name: 'Services', path: '/admin/services', icon: Activity },
    { name: 'Specialization', path: '/admin/specialization', icon: Target },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#F0F0F0] font-sans">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: 'rgba(20, 20, 20, 0.3)',
            backdropFilter: 'blur(25px) saturate(200%) brightness(120%)',
            WebkitBackdropFilter: 'blur(25px) saturate(200%) brightness(120%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600',
            padding: '16px 24px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
            letterSpacing: '0.3px',
            minWidth: '320px',
          },
          success: {
            icon: <Check className="text-emerald-400" size={24} strokeWidth={3} />,
            style: {
              borderLeft: '5px solid #10b981',
            },
            duration: 4000,
          },
          error: {
            icon: <X className="text-red-400" size={24} strokeWidth={3} />,
            style: {
              borderLeft: '5px solid #ef4444',
            },
            duration: 6000,
          },
        }}
      />
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col fixed h-full z-20">
        {/* Logo Section */}
        <div className="p-8 pb-4 flex flex-col items-center">
          <img src={logo} alt="GymBeam" className="h-12 w-auto mb-2 brightness-0 invert" />
          <div className="text-[10px] font-bold text-white/30 tracking-wider">ADMIN PANEL</div>
          <div className="w-full h-px bg-white/5 mt-6"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                  ? 'bg-[#E92150] text-white shadow-lg shadow-primary/20'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              <span className="text-sm font-semibold tracking-wide">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-lg transition-colors group"
          >
            <LogOut size={20} className="shrink-0" />
            <span className="text-sm font-bold tracking-wide">Sign out</span>
          </button>
        </div>

        {/* Collapse Button (Visual only) */}
        <div className="absolute top-10 -right-3">
          <button className="bg-[#111111] border border-white/10 rounded-full p-1 text-white/40 hover:text-white shadow-sm">
            <ChevronLeft size={14} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 pt-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

