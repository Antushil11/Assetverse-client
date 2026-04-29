import React from 'react';
import logo from "../../src/assets/AssetVerse logo with.png";
import { Link, Outlet } from 'react-router';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap, Box } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side - Hero/Visual */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:w-1/2 bg-[#03373D] relative p-12 flex flex-col justify-between overflow-hidden"
            >
                {/* High-Resolution Clear Background Image */}
                <div className="absolute inset-0 opacity-10">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=100&w=2500" 
                        alt="Corporate Excellence" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10">
                    <Link to="/" className="inline-block group">
                        <img className="h-16 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" src={logo} alt="AssetVerse" />
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
                            <Sparkles size={14} className="text-primary" /> The Future of Asset Management
                        </div>
                        <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
                            Manage Assets with <span className="text-primary">Precision.</span>
                        </h1>
                        <p className="text-lg text-white/60 font-medium leading-relaxed">
                            Experience the most powerful ecosystem for tracking, managing, and optimizing your enterprise resources. 
                        </p>
                    </motion.div>

                    <div className="mt-12 grid grid-cols-2 gap-8">
                        {[
                            { icon: Shield, label: "Secure Data", desc: "Military-grade encryption" },
                            { icon: Zap, label: "Real-time", desc: "Instant synchronization" }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary backdrop-blur-sm">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{item.label}</p>
                                    <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-[#03373D]" alt="" />
                        ))}
                    </div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Joined by 2,000+ organizations</p>
                </div>

            </motion.div>

            {/* Right Side - Forms */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24"
            >
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;