import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, ArrowUpRight, Sparkles } from "lucide-react";
import logo from "../../../assets/AssetVerse logo with.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "Asset Tracking", path: "/CaseStudies" },
        { name: "Team Sync", path: "/RecentWork" },
        { name: "Resource Guard", path: "/Creative-Work" },
        { name: "Global Coverage", path: "/Coverage" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About AssetVerse", path: "/about" },
        { name: "Genesis Project", path: "/ExpansiveProject" },
        { name: "Enterprise Security", path: "/security" },
        { name: "Support Hub", path: "/support" },
      ]
    },
    {
      title: "Portal",
      links: [
        { name: "Employee Login", path: "/login" },
        { name: "HR Registration", path: "/Hrregister" },
        { name: "Corporate Terms", path: "/terms" },
        { name: "Privacy Shield", path: "/privacy" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-[#03373D] text-white pt-32 pb-12 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={logo} alt="AssetVerse" className="h-12 w-auto mb-8 brightness-0 invert" />
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                The intelligent backbone for modern enterprises. We orchestrate digital resources with unprecedented precision and scale.
              </p>
            </motion.div>
            
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 text-white/60 hover:text-primary hover:border-primary"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">{section.title}</h4>
                <ul className="space-y-5">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        to={link.path} 
                        className="text-white/50 hover:text-white transition-all duration-500 flex items-center group text-sm font-bold"
                      >
                        {link.name}
                        <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="p-8 bg-white/5 border border-white/5 rounded-[40px] backdrop-blur-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Market Insights</h4>
              <p className="text-xs text-white/60 mb-8 font-medium leading-relaxed">Join 24k+ executives receiving our bi-weekly strategy report.</p>
              <form className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Work email"
                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-xs uppercase tracking-widest placeholder:text-white/20"
                  />
                </div>
                <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <Sparkles size={14} className="text-primary" /> 
            © {currentYear} AssetVerse Global Inc. All rights reserved.
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <Link to="/security" className="hover:text-white transition-colors">Security Audit</Link>
            <Link to="/status" className="hover:text-white transition-colors">System Uptime</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Privacy Shield</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


