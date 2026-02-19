import React from "react";
import assets from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Your one-stop shop for all your needs.
          </p>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="#" className="hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-1 text-gray-600 mt-2">
            <li>123 Main Street, City</li>
            <li>contact@forever.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-sm text-gray-600 py-5">
          © 2025 Forever. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
