import React from "react";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white p-6">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl w-full">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Empowering Businesses with <span className="text-primary">Smart Digital Solutions</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            We provide high-quality corporate-grade designs, optimized systems, and modern technologies to help companies grow.
          </p>
          <button className="px-8 py-4 bg-primary text-white rounded-2xl text-lg hover:bg-primary/90 transition-all">
            Get Started
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1598257006626-48b0c252070d"
            alt="Corporate Workspace"
            className="rounded-3xl shadow-2xl w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
