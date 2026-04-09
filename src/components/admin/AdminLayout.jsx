import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, 
  Layers, 
  Package, 
  MessageSquare, 
  LogOut,
  ChevronLeft
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
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Category', path: '/admin/categories', icon: Layers },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        {/* Logo Section */}
        <div className="p-8 pb-4 flex flex-col items-center">
          <img src={logo} alt="GymBeam" className="h-12 w-auto mb-2" />
          <div className="text-[10px] font-bold text-gray-400 tracking-wider">ADMIN PANEL</div>
          <div className="w-full h-px bg-gray-100 mt-6"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#5E5CE6] text-white shadow-lg shadow-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              <span className="text-sm font-semibold tracking-wide">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <LogOut size={20} className="shrink-0" />
            <span className="text-sm font-bold tracking-wide">Sign out</span>
          </button>
        </div>

        {/* Collapse Button (Visual only as per image) */}
        <div className="absolute top-10 -right-3">
          <button className="bg-white border border-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-600 shadow-sm">
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
