import React from "react";
import {
  FaMobileAlt,
  FaShieldAlt,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="h-full bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
      }}
    >
      <Navbar />
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-bold text-gray-100">
          Fast, Secure & Reliable Records
        </h1>
        <Link to="/Login">
          <button className="mt-8 py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-800 flex items-center">
            Admin Login <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Why Choose DealsDray?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl">
              <FaMobileAlt className="text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Mobile-Friendly
              </h3>
              <p className="text-gray-500 mt-4">
                Add records anywhere with our seamless mobile-friendly
                interface.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl">
              <FaShieldAlt className="text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Secure Transactions
              </h3>
              <p className="text-gray-500 mt-4">
                Protect your records with our top-notch security and
                encryption.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl">
              <FaMoneyBillWave className="text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Instant Update
              </h3>
              <p className="text-gray-500 mt-4">
                Experience fast and hassle-free record update.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-200 py-20 text-center text-gray-800">
        <h2 className="text-4xl font-bold mb-6">
          Get Started with DealsDray Today
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          Start using DealsDray for your daily record management.
        </p>
        <Link to="/CreateAccount">
          <button className="py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-800">
            Create Your Account Now
          </button>
        </Link>
      </div>

      <div
        style={{
          backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
        }}
      >
        {/* Footer Section */}
        <footer className=" text-gray-100 py-10">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} DealsDray. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
