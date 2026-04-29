import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  List, 
  PlusSquare, 
  ClipboardList, 
  Package, 
  History, 
  Users, 
  UserCircle, 
  Bell, 
  Search,
  ChevronRight,
  LogOut,
  ShieldCheck
} from "lucide-react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import logo from "/src/assets/Large version of the.png";

const DashbordLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();

  const adminLinks = [
    { name: "Asset List", path: "/HR-Manager/Asset-List", icon: List },
    { name: "Add an Asset", path: "/HR-Manager/Add-an-Asset", icon: PlusSquare },
    { name: "All Requests", path: "/HR-Manager/All-Requests", icon: ClipboardList },
    { name: "Upgrade Package", path: "/HR-Manager/Upgrade-Package", icon: Package },
    { name: "Payment History", path: "/HR-Manager/payment-history", icon: History },
    { name: "User Management", path: "/HR-Manager/User-Management", icon: Users },
  ];

  const employeeLinks = [
    { name: "My Assets", path: "/Employee/My-Assets", icon: Package },
    { name: "Request an Asset", path: "/Employee/Request-an-Asset", icon: PlusSquare },
    { name: "My Team", path: "/Employee/My-Team", icon: Users },
    { name: "Profile Page", path: "/Employee/Profile-Page", icon: UserCircle },
  ];

  const links = (role === "admin" || role === "hr") ? adminLinks : employeeLinks;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 transform lg:translate-x-0">
        <div className="p-8 border-b border-gray-50 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">AssetVerse</span>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-4">Management</p>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group
                ${isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <link.icon size={20} className={isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-900"} />
                    <span className="text-sm">{link.name}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={logOut}
            className="w-full flex items-center gap-3 px-4 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 flex items-center justify-between px-10">
          <div className="relative group w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..."
              className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{user?.displayName || "Manager"}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">{role}</p>
              </div>
              <img 
                src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt="Profile" 
                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="p-10 flex-grow">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashbordLayout;

