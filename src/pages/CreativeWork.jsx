import React from "react";
import { motion } from "framer-motion";
import { Palette, ExternalLink, Image, Layout, Compass } from "lucide-react";

const CreativeWork = () => {
  const projects = [
    {
      title: "Abstract Identity",
      description: "Visual system for a next-gen digital asset brokerage.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=100&w=2128",
      category: "Branding",
      icon: Palette
    },
    {
      title: "Flow Interface",
      description: "Gesture-based mobile interaction models for HR platforms.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80",
      category: "UI/UX",
      icon: Layout
    },
    {
      title: "Neon Commerce",
      description: "Immersive e-commerce environment for luxury hardware.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=100&w=2340",
      category: "Web Design",
      icon: Compass
    },
    {
      title: "Digital Artifacts",
      description: "3D visual assets for enterprise marketing campaigns.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=100&w=2340",
      category: "Graphics",
      icon: Image
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#022C31]">
      {/* Page Hero */}
      <section className="py-32 rounded-b-[80px] relative overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full text-white/80 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
            <Palette size={14} className="text-primary" /> Visual Innovation
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            Creative <br /> <span className="text-primary">Explorations.</span>
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Where art meets enterprise logic. Pushing the boundaries of digital expression.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-[550px] rounded-[48px] overflow-hidden cursor-pointer shadow-2xl shadow-black/40"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 grayscale-[0.5] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022C31] via-[#022C31]/40 to-transparent flex flex-col justify-end p-10 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center text-white">
                        <project.icon size={16} />
                    </div>
                    <span className="text-primary font-black uppercase tracking-widest text-[9px]">{project.category}</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{project.title}</h3>
                <p className="text-white/40 text-sm mb-8 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] group/btn">
                  View Evolution <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreativeWork;


