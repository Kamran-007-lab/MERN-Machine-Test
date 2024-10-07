import React, { useEffect } from "react";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import LoggedNavbar from "../components/LoggedNavbar";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
      }}
    >
      <LoggedNavbar />
      <div className="flex flex-col items-center justify-center mt-12 text-center gap-y-10">
        <h1 className="text-5xl font-bold text-gray-100">Welcome Admin!</h1>
        <h2 className="text-2xl font-bold text-gray-100">How was your day?</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <Link to="/CreateEmployee">
            <button className="py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-800 flex items-center">
              <FaUserPlus className="mr-2" /> Create an Employee
            </button>
          </Link>

          <Link to="/EmployeeList">
            <button className="py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-800 flex items-center">
              <FaUsers className="mr-2" /> View Employees
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
