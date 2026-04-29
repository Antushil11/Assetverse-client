import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "AssetVerse Ecosystem",
      description: "Revolutionizing digital asset lifecycle management for mid-size enterprises.",
      challenge: "Managing asset allocation and employee assignments across 50+ departments.",
      solution: "Role-based synchronization with real-time audit logs and automated recovery.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    },
    {
      title: "Global Supply Sync",
      description: "Optimizing cross-border hardware distribution for tech conglomerates.",
      challenge: "Secure checkout and dynamic inventory tracking across global regions.",
      solution: "Integrated specialized payment bridges and multi-region database sharding.",
      technologies: ["React", "Stripe", "PostgreSQL", "Next.js"],
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=2168",
    },
    {
      title: "Visionary Portfolio",
      description: "A showcase platform for a leading architectural innovation group.",
      challenge: "High-performance rendering of 4K assets with smooth interactions.",
      solution: "Custom-built lazy loading system with framer-motion orchestration.",
      technologies: ["React", "Framer Motion", "Three.js"],
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2301",
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#021A1D]">
      {/* Page Hero */}
      <section className="py-32 rounded-b-[80px] relative overflow-hidden mb-20 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full text-white/80 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
            <BookOpen size={14} className="text-primary" /> Enterprise Knowledge
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            Strategic <br /> <span className="text-primary">Case Studies.</span>
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Detailed insights into how we've solved complex asset management challenges for world-class organizations.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-3 gap-12">
          {caseStudies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-[48px] border border-white/10 shadow-2xl overflow-hidden flex flex-col group backdrop-blur-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021A1D]/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {item.technologies.slice(0, 2).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md text-white/60 text-[9px] font-black uppercase tracking-widest rounded-full border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 flex-grow space-y-8">
                <div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-white/40 font-medium leading-relaxed italic text-sm">
                    "{item.description}"
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary flex-shrink-0 border border-white/5">
                      <Layers size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">The Challenge</p>
                      <p className="text-sm font-bold text-white/80 leading-snug">{item.challenge}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 border border-primary/20">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Our Solution</p>
                      <p className="text-sm font-bold text-white/80 leading-snug">{item.solution}</p>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary hover:gap-5 transition-all">
                  Read Full Study <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>

  );
};

export default CaseStudies;


