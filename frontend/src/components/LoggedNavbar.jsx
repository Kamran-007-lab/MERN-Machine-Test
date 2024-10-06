import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedNavbar = () => {
  let navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async() => {
    const response = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(formData),
      credentials:"include",
    });
    const result=await response.json();
    if(response.ok){
      // sessionStorage.setItem("phoneNumber", formData.phoneNumber);
      console.log(response.data);
      navigate("/");
    }
    else{
      console.error("Failed to logout the user",result)
    }
  }

  return (
    <nav className="sticky top-0 z-50">
      <div className="container mx-auto py-4 flex justify-between items-center text-white text-xl rounded-3xl">
        
        {/* Logo */}
        <div className="text-4xl font-semibold text-white">
          <h1>DealsDray</h1>
        </div>

        {/* Links for large screens */}
        <div className="hidden lg:flex lg:space-x-40 lg:items-center">
        <div className='flex'>
          <h1
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            Home
          </h1>
          <h1
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            Employee List
          </h1>
          </div>
          <div className='flex'>
          <h1
            className="block py-2 px-4 text-white hover:scale-125 duration-200"
          >
            Hukum Gupta
          </h1>
          <h1
            className="block py-2 px-4 bg-white text-black rounded-2xl shadow hover:scale-125 duration-200"
          >
            Logout
          </h1>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A7.25 7.25 0 0112 15.25c1.897 0 3.613.724 4.879 1.902M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </button>
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-10">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <h1
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Home
                </h1>
              </li>
              <li>
                <h1
                  href="#services"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Employee List
                </h1>
              </li>
              <li>
                <h1
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Hukum Gupta
                </h1>
              </li>
              <li>
                <h1
                  className="block py-2 px-4 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700"
                >
                  Logout
                </h1>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LoggedNavbar;
