import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router";
import { MdPets } from "react-icons/md";


const Footer = () => {
  return (
    <footer className="bg-indigo-50 text-gray-800 py-1">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-10">
        <div className="text-center lg: text-left">
          <Link to="/" className="text-4xl font-bold text-indigo-600 flex gap-1 hover:text-indigo-700 items-center">
            <MdPets size={30}/> PawMart
          </Link>

          <p className="text-gray-600 mt-2 max-w-xs">
            PawMart connects local pet owners and buyers for adoption and pet care products.
          </p>
        </div>

        {/* Footer links */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="text-indigo-600 font-semibold">
            <li><a href="/" className="hover:border-b-2 inline-block transform hover:scale-105 transition duration-300">Home</a></li>

            <li><a className="hover:border-b-2 inline-block transform hover:scale-105 transition duration-300 mt-1">Services</a></li>

            <li><a href className="hover:border-b-2 inline-block transform hover:scale-105 transition duration-300 mt-1">Contact</a></li>

            <li><a href className="hover:border-b-2 inline-block transform hover:scale-105 transition duration-300 mt-1">Terms and condition</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p className="text-indigo-600 font-semibold">Email: pawmart@gmail.com</p>
          <p className="text-indigo-600 font-semibold">Phone: 01336458100</p>
          <div className="flex space-x-5 mt-3">

            {/* Social link */}
            <div className="flex gap-5 items-center ml-35">
              <a href="" className="text-indigo-600 hover:text-indigo-800 inline-block transform hover:scale-120 transition duration-200"><FaFacebook size={30} />
</a>
            <a href="" className="text-cyan-500 hover:text-cyan-700 inline-block transform hover:scale-120 transition duration-200"><FaInstagram size={30} />
</a>
            <a href="" className="text-gray-800 hover:text-gray-900 inline-block transform hover:scale-118 transition duration-200"><BsTwitterX size={30} />
</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600 text-sm">
        &copy; 2025 ShigroiService. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
