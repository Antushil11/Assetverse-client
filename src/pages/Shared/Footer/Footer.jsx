import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../../assets/AssetVerse logo with.png";

const Footer = () => {
  return (
    <footer className="bg-[#4A1FBF] mt-1 text-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <Link to={'/'} className="text-2xl font-bold text-primary mb-3">
            <img className="w-40 -mt-16" src={logo} alt="" />
          </Link>
          <p className="text-gray-400">
            Smart Asset Management Platform for Employees and HR Managers.
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary ml">
                Home
              </Link>
            </li>
            <li>
              <Link to="/join-employee" className="hover:text-primary">
                Join as Employee
              </Link>
            </li>
            <li>
              <Link to="/join-hr" className="hover:text-primary">
                Join as HR Manager
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-primary">
                Profile
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              className="hover:text-primary"
              href="mailto:support@assetverse.com"
            >
              support@assetverse.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a className="hover:text-primary" href="tel:+880123456789">
              +880 1234 56789
            </a>
          </p>

          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://www.facebook.com/" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="https://x.com/" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/accounts/login/?hl=en" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/" className="hover:text-primary">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

     
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Antu Shil. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
