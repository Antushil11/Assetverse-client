import React from "react";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import Testimonials from "../Testimonials/Testimonials";
import About from "../About/About";
import ExtraSections from "../ExtraSections/ExtraSections";
import UpgradePackage from "../../HRManager/UpgradePackage";
import CaseStudies from "../../CaseStudies";
import RecentWork from "../../RecentWork";
import CreativeWork from "../../CreativeWork";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-[#F8FAFC] selection:bg-primary selection:text-white">
      <Banner />
      
      <section className="relative z-10 -mt-20 px-6">
        <About />
      </section>

      <div className="space-y-32 py-32">
        <CaseStudies />
        <RecentWork />
        <CreativeWork />
        
        <div className="py-32">
          <UpgradePackage />
        </div>

        <Features />
        <Testimonials />
        <ExtraSections />
      </div>
    </div>
  );
};

export default Home;


