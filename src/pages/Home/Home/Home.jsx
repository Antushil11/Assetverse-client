import React from "react";
import Banner from "../Banner/Banner";

import Features from "../Features/Features";
import Testimonials from "../Testimonials/Testimonials";
import About from "../About/About";
import ExtraSections from "../ExtraSections/ExtraSections";
import UpgradePackage from "../../HRManager/UpgradePackage";

const Home = () => {
  return (
    <div className="pt-24 bg-[#A275FF]">
      <Banner> </Banner>
      <About></About>
      <UpgradePackage></UpgradePackage>
      <Features></Features>
      <Testimonials></Testimonials>
      <ExtraSections></ExtraSections>
    </div>
  );
};

export default Home;
