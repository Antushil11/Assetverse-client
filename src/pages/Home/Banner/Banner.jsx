import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function Banner() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#03373D] overflow-hidden rounded-b-[80px] pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-emerald-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10 py-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full text-white/80 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
            <Sparkles size={16} className="text-primary" /> Future-Proof Asset Management
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            Smart Assets. <br />
            <span className="text-primary">Better Business.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-lg font-medium leading-relaxed">
            Automate tracking, optimize allocation, and maximize ROI with our enterprise-grade digital asset management ecosystem.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link to="/register">
              <button className="px-10 py-5 bg-primary text-white rounded-3xl text-lg font-black shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3">
                Get Started <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/Coverage">
              <button className="px-10 py-5 border border-white/10 text-white rounded-3xl text-lg font-black hover:bg-white/5 transition-all">
                View Coverage
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
            {[
              { label: "Active Users", value: "24k+" },
              { label: "Asset Value", value: "$1.2B" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Hero Image */}
          <div className="relative z-10 rounded-[60px] overflow-hidden border-[12px] border-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=100&w=2500"
              alt="Corporate Excellence"
              className="w-full aspect-[4/5] object-cover hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03373D]/80 via-transparent to-transparent"></div>
          </div>

          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-[32px] shadow-2xl shadow-black/20 flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">+42%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Efficiency Boost</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
            className="absolute -bottom-10 -left-10 z-20 bg-gray-900 p-6 rounded-[32px] shadow-2xl flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <Shield size={28} />
            </div>
            <div>
              <p className="text-lg font-black text-white italic">Enterprise Secured</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-1 bg-primary rounded-full"></div>)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

