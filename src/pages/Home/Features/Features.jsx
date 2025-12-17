import React from "react";
import { ShieldCheck, Users, Zap, FolderKanban, Cloud, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      desc: "Advanced protection to keep your business data safe.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      desc: "Work together seamlessly with a connected workspace.",
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      desc: "Fast and optimized system for greater productivity.",
    },
    {
      icon: FolderKanban,
      title: "Smart Asset Management",
      desc: "Organize and manage all your files in one place.",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      desc: "Access your platform from anywhere, anytime.",
    },
    {
      icon: BarChart3,
      title: "Analytics Insights",
      desc: "Track performance with real-time analytics.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 w-full flex justify-center px-6 rounded-2xl">
      <div className="max-w-7xl w-full text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">Features That Help You Grow</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the powerful tools designed to make your business smarter and more efficient.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary"
            >
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-2xl 
              bg-gradient-to-br from-primary to-primary/70 
              transition-all duration-300 
              hover:from-primary/70 hover:to-primary 
              transform hover:scale-110 mb-6">
                <item.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
