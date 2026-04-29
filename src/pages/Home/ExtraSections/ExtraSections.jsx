import React from "react";
import { ArrowRight, HelpCircle, PhoneCall } from "lucide-react";

const ExtraSections = () => {
  return (
    <div className="w-full space-y-32">
      {/* Workflow Section */}
      <section className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
              System Onboarding
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Strategic <span className="text-primary">Workflow.</span></h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Our 3-stage integration process ensures your organization is operational within minutes.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {[ 
            { n: "01", title: "Global Genesis", desc: "Initialize your corporate identity and establish secure administrative protocols.", icon: HelpCircle },
            { n: "02", title: "Neural Sync", desc: "Map your asset hierarchy and synchronize employee roles with zero downtime.", icon: PhoneCall },
            { n: "03", title: "Full Spectrum", desc: "Execute real-time tracking across all regions with unified executive oversight.", icon: ArrowRight }
          ].map((step, index) => (
            <div
              key={index}
              className="group bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="text-[80px] font-black text-gray-50 absolute -top-10 -right-4 transition-colors group-hover:text-primary/10">
                {step.n}
              </div>
              <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-primary transition-colors tracking-tight">{step.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic text-sm">"{step.desc}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6">
        <div className="bg-[#03373D] rounded-[60px] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5 backdrop-blur-md">
                        Knowledge Base
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">
                        Executive <br /> <span className="text-primary">Intelligence.</span>
                    </h2>
                    <p className="text-white/40 font-medium text-lg leading-relaxed max-w-md">
                        Find rapid answers to critical operational questions regarding our infrastructure and security.
                    </p>
                    <button className="px-10 py-5 bg-white text-[#03373D] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl shadow-black/20">
                        View documentation
                    </button>
                </div>

                <div className="space-y-6">
                    {[
                        { q: "Data Security Protocols?", a: "We utilize AES-256 military-grade encryption with multi-factor authentication for all administrative layers." },
                        { q: "Infrastructure Scalability?", a: "AssetVerse is built on a distributed cloud architecture that scales dynamically with your company's growth." },
                        { q: "Global Region Support?", a: "Full operational capacity across all 64 districts with centralized real-time synchronization." },
                    ].map((item, index) => (
                        <div key={index} className="p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all group backdrop-blur-md">
                            <h4 className="font-black text-white mb-2 tracking-tight flex items-center gap-3">
                                <HelpCircle size={18} className="text-primary" /> {item.q}
                            </h4>
                            <p className="text-white/40 text-sm font-medium leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="relative rounded-[60px] overflow-hidden bg-primary p-20 text-center text-white shadow-2xl shadow-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
            <div className="relative z-10 space-y-8">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9]">Ready to Synchronize <br /> Your Enterprise?</h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
                    Join the ranks of elite organizations managing their assets with maximum precision.
                </p>
                <div className="flex justify-center gap-6 pt-4">
                    <a
                    href="mailto:executive@assetverse.com"
                    className="inline-flex items-center gap-4 bg-white text-primary px-12 py-6 rounded-3xl font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                    <PhoneCall size={24} />
                    Contact Executive Team
                    </a>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
