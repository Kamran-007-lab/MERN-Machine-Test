import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50">
      <div className="container mx-auto py-4 flex justify-between items-center text-white text-xl rounded-3xl ">
        
        {/* Logo */}
        <div className="text-4xl font-semibold text-white">
          <span>DealsDray</span>
        </div>

        {/* Hamburger Button (Mobile View) */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links for large screens */}
        <div className="hidden lg:flex lg:space-x-8 lg:items-center">
          <Link
            to="/"
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            Home
          </Link>
          <a
            href="#services"
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            Services
          </a>
          <a
            href="#about"
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            Contact
          </a>
          <a
            href="#get-started"
            className="block py-2 px-4 bg-white text-black rounded-2xl shadow hover:scale-125 duration-200"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-10">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#services"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#get-started"
                  className="block py-2 px-4 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
