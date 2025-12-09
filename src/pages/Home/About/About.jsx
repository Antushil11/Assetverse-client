import React from "react";
import { ShieldCheck, Users, TrendingUp, Briefcase } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const About = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Secure Digital Assets",
      description: "Protect your corporate data with enterprise-grade security and encryption.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Enable efficient teamwork with centralized and organized workflows.",
    },
    {
      icon: TrendingUp,
      title: "Boost Productivity",
      description: "Optimize operations and improve productivity with smart automation.",
    },
    {
      icon: Briefcase,
      title: "Corporate-Ready",
      description: "Scalable, reliable, and professional solutions for your business needs.",
    },
  ];

  return (
    <section className="py-24  w-full flex justify-center px-6">
      <div className="max-w-6xl w-full text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">Why Choose AssetVerse?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          AssetVerse offers innovative solutions tailored for modern businesses, ensuring security, efficiency, and scalability for your team.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center m-2">
                <benefit.icon className="w-14 h-14 mx-auto text-primary mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default About;
