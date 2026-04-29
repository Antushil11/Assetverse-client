import React from "react";
import { ShieldCheck, Users, Zap, FolderKanban, Cloud, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Enterprise Guard",
      desc: "Bank-grade encryption and advanced threat detection for all corporate data.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Sync Workforce",
      desc: "Centralized collaboration hub for distributed global teams.",
      color: "emerald"
    },
    {
      icon: Zap,
      title: "Instant Response",
      desc: "Optimized infrastructure ensuring millisecond latency across operations.",
      color: "primary"
    },
    {
      icon: FolderKanban,
      title: "Asset Intelligence",
      desc: "AI-driven organization and automated tagging for enterprise resources.",
      color: "indigo"
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      desc: "High-availability cloud infrastructure with 99.99% uptime guarantee.",
      color: "amber"
    },
    {
      icon: BarChart3,
      title: "Precision Analytics",
      desc: "Real-time decision support with interactive executive dashboards.",
      color: "red"
    },
  ];

  return (
    <section className="container mx-auto px-6">
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
          Powerful Capabilities
        </div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
          Engineered for <span className="text-primary">Performance.</span>
        </h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Discover the industrial-grade tools designed to scale your operations and protect your most valuable resources.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-lg">
                <item.icon size={28} />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                {item.desc}
              </p>

              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

