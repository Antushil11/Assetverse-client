import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Globe, Smartphone, Code } from "lucide-react";

const RecentWork = () => {
  const recentProjects = [
    {
      title: "AssetVerse Core",
      description: "Enterprise-grade asset management infrastructure for modern teams.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=100&w=2426",
      tag: "Infrastructure",
      icon: Code
    },
    {
      title: "MarketFlow UI",
      description: "High-performance dashboard system for real-time financial tracking.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=1200&q=80",
      tag: "UI/UX Design",
      icon: Smartphone
    },
    {
      title: "Global Link",
      description: "Secure cross-border communication network for remote organizations.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=100&w=2344",
      tag: "Networking",
      icon: Globe
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#021A1D]">
      {/* Page Hero */}
      <section className="py-32 rounded-b-[80px] relative overflow-hidden mb-20 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full text-white/80 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
            <Briefcase size={14} className="text-primary" /> Portfolio Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            Our Latest <br /> <span className="text-primary">Masterpieces.</span>
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Witness the intersection of high-performance engineering and world-class design.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-3 gap-12">
          {recentProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative rounded-[48px] overflow-hidden aspect-[4/5] mb-10 shadow-2xl shadow-gray-200/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021A1D]/90 via-transparent to-transparent flex flex-col justify-end p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center text-white border border-primary/20">
                      <project.icon size={20} />
                    </div>
                    <span className="text-primary font-black uppercase tracking-widest text-[10px]">{project.tag}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <button className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all transform translate-y-10 group-hover:translate-y-0 duration-500 shadow-xl">
                    <ArrowUpRight size={24} />
                  </button>
                </div>
              </div>
              <div className="px-6 space-y-4">
                <p className="text-white/40 font-medium leading-relaxed italic">
                  "{project.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>

  );
};

export default RecentWork;


