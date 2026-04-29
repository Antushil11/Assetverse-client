import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, LayoutDashboard, Briefcase, Palette, Layers, Map, Sparkles, ChevronDown } from "lucide-react";
import logo from "../../../assets/AssetVerse logo with.png";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Sparkles },
    { name: "Case Studies", path: "/CaseStudies", icon: Layers },
    { name: "Recent Work", path: "/RecentWork", icon: Briefcase },
    { name: "Creative Work", path: "/Creative-Work", icon: Palette },
    { name: "Coverage", path: "/Coverage", icon: Map },
    { name: "Genesis", path: "/ExpansiveProject", icon: LayoutDashboard },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "py-3" : "py-6"}`}>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative rounded-[32px] transition-all duration-700 border ${
            isScrolled 
              ? "bg-[#03373D] border-white/10 shadow-2xl shadow-black/40" 
              : "bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl shadow-gray-200/50"
          }`}
        >
          <div className="flex items-center justify-between px-8 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.img 
                whileHover={{ rotate: -5, scale: 1.1 }}
                src={logo} 
                alt="AssetVerse" 
                className={`h-20 w-auto transition-all duration-500 ${isScrolled ? "brightness-0 invert" : ""}`}
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2
                    ${isActive 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : isScrolled ? "text-white/60 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to={role === "hr" ? "/HR-Manager" : "/Employee"}
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 ${
                      isScrolled ? "bg-white/5 border-white/10 text-white/60 hover:text-primary hover:border-primary" : "bg-gray-50 border-gray-100 text-gray-400 hover:text-primary hover:border-primary"
                    }`}
                  >
                    <LayoutDashboard size={20} />
                  </Link>

                  <div className="relative">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center gap-3 p-1 pr-4 rounded-full border transition-all duration-500 group ${
                        isScrolled ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                      }`}
                    >
                      <img
                        src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-primary transition-all group-hover:scale-105"
                      />
                      <ChevronDown size={16} className={`transition-transform duration-500 ${isUserMenuOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-white/40' : 'text-gray-400'}`} />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.95 }}
                          className="absolute top-full right-0 mt-4 w-64 bg-[#0A0A0B] backdrop-blur-3xl border border-white/5 rounded-[32px] p-4 shadow-2xl z-[110]"
                        >
                          <div className="px-4 py-4 border-b border-white/5 mb-2">
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Authenticated Account</p>
                            <p className="text-white font-black truncate">{user.displayName || "Executive User"}</p>
                            <p className="text-white/40 text-[10px] truncate">{user.email}</p>
                          </div>
                          
                          <button 
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-3 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
                          >
                            <LogOut size={18} />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-white/5 text-white/70 hover:text-white transition-all border border-white/5"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 mx-6 mt-4 p-6 bg-[#03373D] backdrop-blur-3xl rounded-[40px] border border-white/5 shadow-2xl z-[100]"
          >
            <div className="space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
                    ${isActive ? "bg-primary text-white shadow-xl" : "text-white/60 hover:bg-white/5 hover:text-white"}
                  `}
                >
                  <link.icon size={18} />
                  {link.name}
                </NavLink>
              ))}
              
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                {user ? (
                  <button 
                    onClick={handleLogOut}
                    className="col-span-2 flex items-center justify-center gap-3 py-5 text-red-400 font-black text-xs uppercase tracking-widest bg-red-500/10 rounded-2xl"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-5 text-white/60 font-black text-xs uppercase tracking-widest border border-white/10 rounded-2xl"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20"
                    >
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


