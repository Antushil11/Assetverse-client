import React from "react";
import { Star, Building2, Users, ShieldCheck, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Carter",
      company: "TechNova Solutions",
      role: "CTO",
      feedback:
        "AssetVerse transformed the way our team manages digital assets. The workflow has never been smoother, and the insights are invaluable.",
    },
    {
      name: "Sophia Williams",
      company: "BrightLine Corp",
      role: "Director of Ops",
      feedback:
        "Their platform improved our team's efficiency by more than 40%. Highly recommended for any growing company seeking scalability.",
    },
    {
      name: "David Miller",
      company: "CloudHaven Ltd.",
      role: "Managing Director",
      feedback:
        "Secure, reliable, and beautifully designed — exactly what a modern business needs to stay ahead in the digital race.",
    },
  ];

  const stats = [
    { icon: Building2, number: "100+", label: "Enterprise Clients" },
    { icon: Users, number: "5,000+", label: "Professional Users" },
    { icon: ShieldCheck, number: "99.9%", label: "Platform Uptime" },
  ];

  return (
    <section className="container mx-auto px-6">
      <div className="grid lg:grid-cols-3 gap-20 items-center mb-32">
        <div className="lg:col-span-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            Social Proof
          </div>
          <h2 className="text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter">
            Voices of <br /> <span className="text-primary">Success.</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Join hundreds of forward-thinking organizations that have revolutionized their asset management strategy.
          </p>
          
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
              +12k
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-10 rounded-[48px] relative ${index === 0 ? 'bg-gray-900 text-white md:row-span-2 flex flex-col justify-between' : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50'}`}
            >
              <Quote className={`mb-8 ${index === 0 ? 'text-primary' : 'text-gray-200'}`} size={48} />
              
              <p className={`text-xl font-medium leading-relaxed italic mb-12 ${index === 0 ? 'text-white/80' : 'text-gray-600'}`}>
                "{t.feedback}"
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                  <img src={`https://i.pravatar.cc/150?u=${t.name}`} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`font-black tracking-tight ${index === 0 ? 'text-white' : 'text-gray-900'}`}>{t.name}</h3>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${index === 0 ? 'text-primary' : 'text-gray-400'}`}>{t.role} • {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#03373D] rounded-[60px] p-12 md:p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
        <div className="relative z-10 grid sm:grid-cols-3 gap-12 text-center">
          {stats.map((s, index) => (
            <div key={index} className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center bg-white/10 text-primary backdrop-blur-md border border-white/5 shadow-2xl">
                <s.icon size={32} />
              </div>
              <div>
                <h3 className="text-5xl font-black text-white tracking-tighter mb-1">{s.number}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

