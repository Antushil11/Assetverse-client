import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Nabvar/Nabvar";

const RootLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-screen max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
