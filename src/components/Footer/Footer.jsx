import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdPets } from "react-icons/md";


const Footer = () => {
  return (
    <footer className="bg-indigo-50 text-gray-800 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">

        {/* Website Name */}
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start text-4xl font-bold text-indigo-600 gap-2 hover:text-indigo-700"
          >
            <MdPets size={30} /> PawMart
          </Link>
          <p className="text-gray-600 mt-3 max-w-xs mx-auto md:mx-0">
            PawMart connects local pet owners and buyers for adoption and pet care products.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="text-gray-500 font-semibold space-y-2">
            <li>
              <Link
                to="/"
                className="hover:border-b-2 hover:text-indigo-600 inline-block transform hover:scale-105 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:border-b-2 hover:text-indigo-600 inline-block transform hover:scale-105 transition duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:border-b-2 hover:text-indigo-600 inline-block transform hover:scale-105 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:border-b-2 hover:text-indigo-600 inline-block transform hover:scale-105 transition duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-gray-500 font-semibold">Email: pawmart@gmail.com</p>
          <p className="text-gray-500 font-semibold">Phone: 01336458100</p>

          <div className="flex justify-center mt-4 gap-5">
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 transform hover:scale-125 transition duration-200"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 transform hover:scale-125 transition duration-200"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 transform hover:scale-125 transition duration-200"
            >
              <BsTwitterX size={30} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600 text-sm">
        &copy; 2025 PawMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
