import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Globe, Rocket, Shield, Zap, ArrowRight, Activity, Database } from "lucide-react";

const ExpansiveProject = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const features = [
    { icon: Zap, title: "Neural Sync", description: "Zero-latency asset orchestration powered by high-frequency synchronization nodes." },
    { icon: Shield, title: "Quantum Vault", description: "Cryptographically secured asset protection protocols with multi-layered verification." },
    { icon: Globe, title: "Universal Mesh", description: "Seamless asset governance across global infrastructure without geographical boundaries." },
    { icon: Cpu, title: "Cognitive Engine", description: "Predictive lifecycle intelligence driven by advanced behavioral analytics." },
  ];

  return (
    <div className="bg-[#021A1D] text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=100&w=2500" 
            alt="Deep Tech Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021A1D]/20 via-transparent to-[#021A1D]"></div>
        </motion.div>

        <div className="container mx-auto px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-[0.4em] backdrop-blur-xl">
              <Rocket size={14} /> Project Genesis
            </div>
            <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none">
                EXPANSIVE<span className="text-primary">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed">
              The definitive leap in enterprise resource intelligence. A borderless ecosystem architected for the next generation of global industry.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <button className="px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:-translate-y-1 active:scale-95">
                Initiate Protocol
              </button>
              <button className="px-10 py-5 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all">
                Technical Blueprint
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">System Scan</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* Industrial Features */}
      <section className="py-40 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-12 rounded-[56px] bg-white/5 border border-white/10 hover:border-primary/40 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-20 h-20 rounded-[28px] bg-primary/20 flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform shadow-xl shadow-primary/10">
                <feature.icon size={36} />
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">{feature.title}</h3>
              <p className="text-white/40 text-xl leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real-time Metrics */}
      <section className="py-40 bg-black/40 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {[
              { label: "Active Nodes", value: "32.4K+", icon: Activity },
              { label: "Network Uptime", value: "99.999%", icon: Shield },
              { label: "Data Throughput", value: "4.8 TB/s", icon: Zap },
              { label: "Secured Capital", value: "$8.2B", icon: Database },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="flex justify-center mb-6">
                    <stat.icon className="text-primary/40" size={24} />
                </div>
                <div className="text-6xl font-black text-white tracking-tighter">{stat.value}</div>
                <div className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Call to Action */}
      <section className="py-60 relative overflow-hidden text-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 blur-[200px] rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 space-y-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-none"
          >
            Ready for <br /> Evolution?
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-20 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-full hover:bg-primary hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]"
          >
            Join Ecosystem
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default ExpansiveProject;

