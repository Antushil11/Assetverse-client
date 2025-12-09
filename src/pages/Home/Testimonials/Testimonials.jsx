import React from "react";
import { Star, Building2, Users, ShieldCheck } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Carter",
      company: "TechNova Solutions",
      feedback:
        "AssetVerse transformed the way our team manages digital assets. The workflow has never been smoother.",
    },
    {
      name: "Sophia Williams",
      company: "BrightLine Corp",
      feedback:
        "Their platform improved our team's efficiency by more than 40%. Highly recommended for any growing company.",
    },
    {
      name: "David Miller",
      company: "CloudHaven Ltd.",
      feedback:
        "Secure, reliable, and beautifully designed — exactly what a modern business needs.",
    },
  ];

  const stats = [
    { icon: Building2, number: "100+", label: "Companies Trust Us" },
    { icon: Users, number: "5,000+", label: "Active Users" },
    { icon: ShieldCheck, number: "99.9%", label: "System Uptime" },
  ];

  return (
    <section className="py-24  w-full flex justify-center px-6">
      <div className="max-w-7xl w-full space-y-16">

        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide for secure and efficient digital asset management.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-3xl shadow-md  transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5"
            >
              <div className="flex justify-center mb-4">
                <Star className="text-primary w-6 h-6" />
                <Star className="text-primary w-6 h-6" />
                <Star className="text-primary w-6 h-6" />
                <Star className="text-primary w-6 h-6" />
                <Star className="text-primary w-6 h-6" />
              </div>

              <p className="text-gray-700 text-sm mb-6">“{t.feedback}”</p>

              <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
              <p className="text-gray-500 text-sm">{t.company}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-8 text-center py-10 bg-gray-50 rounded-3xl shadow-inner">
          {stats.map((s, index) => (
            <div key={index} className="space-y-2 transition-all hover:scale-105">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white">
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{s.number}</h3>
              <p className="text-gray-600 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
