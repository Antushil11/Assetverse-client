import React from "react";
import { ShieldCheck, Users, TrendingUp, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description: "Protect your corporate data with military-grade encryption and advanced access controls.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Users,
      title: "Seamless Collaboration",
      description: "Connect your global workforce with real-time asset sharing and team-wide visibility.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Optimization",
      description: "Harness AI-driven analytics to predict asset lifecycles and optimize resource allocation.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Briefcase,
      title: "Executive Readiness",
      description: "Scalable infrastructure designed to support complex organizational hierarchies and growth.",
      color: "bg-indigo-50 text-indigo-600"
    },
  ];

  return (
    <section className="container mx-auto px-6">
      <div className="bg-white rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-100 p-12 md:p-20 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 grid lg:grid-cols-3 gap-20 items-center">
          <div className="lg:col-span-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-gray-500 text-[10px] font-black uppercase tracking-widest border border-gray-100">
              Why AssetVerse?
            </div>
            <h2 className="text-5xl font-black text-gray-900 leading-tight tracking-tighter">
              Designed for the <span className="text-primary">Next Era</span> of Management.
            </h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              We don't just track assets. We build intelligent ecosystems that empower decision-makers and streamline operations at scale.
            </p>
            <div className="space-y-4">
              {["Global Infrastructure", "Real-time Synchronization", "AI-Powered Insights"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-black text-gray-800">
                  <CheckCircle2 size={18} className="text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${benefit.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors">{benefit.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed italic text-sm">
                  "{benefit.description}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

