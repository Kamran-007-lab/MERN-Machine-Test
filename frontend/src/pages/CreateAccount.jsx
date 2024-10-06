import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginimg from "../assets/login-img.jpg";
import { Link,useNavigate } from "react-router-dom";

const CreateAccount = () => {
  let navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData]=useState({
    fullName: "",
    email: "",
    password: "",
    aadhar: "",
    phoneNumber: ""
  })

  const handleChange =(e) => {
    const name=e.target.name;
    let value=e.target.value;
    if(name==="phoneNumber"){
      value=`+91${value}`
    }
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials:"include",
    });
    const result=await response.json();
    if(response.ok){
      sessionStorage.setItem("phoneNumber", formData.phoneNumber);
      console.log("Going");
    //   navigate("/VerifyOtp");
    }
    else{
      console.error("Failed to get response from backend in create account",result)
    }
  }


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
      }}
    >
      <Navbar />
      <div className="flex h-auto py-10 items-center justify-center">
        <div
          id="card"
          className="w-full md:max-w-3xl lg:max-w-5xl bg-gray-200 rounded-3xl flex flex-col sm:flex-row font-semibold shadow-[rgba(255,255,255,0.6)_-40px_40px_40px_0px,_rgba(255,255,255,0.6)_40px_-40px_40px_0px]"
        >
          {/* Left Side - Illustration */}
          <div className="w-full sm:w-1/2 bg-gray-100 flex items-center justify-center rounded-l-3xl">
            <img
              src={loginimg}
              alt="Exam Mastery Illustration"
              className="w-full h-auto rounded-l-3xl "
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="sm:w-1/2 p-10 flex flex-col justify-center bg-gray-200 rounded-r-3xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">Already have an account ?</span>
              <Link to="/Login">
              <button className="text-black font-medium">Sign In</button>
              </Link>
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Create Profile
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Create Your Payment Profile
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full name as per Aadhar card"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="businessEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="sales@business.co.au"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="businessEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone*
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="9988776655"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="businessEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aadhar*
                </label>
                <input
                  type="number"
                  id="aadhar"
                  name="aadhar"
                  placeholder="745423889632"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••••"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    onChange={handleChange}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">
                This information will be securely saved as per the{" "}
                <span className="underline">Terms of Service</span> &{" "}
                <span className="underline">Privacy Policy</span>
              </p>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 text-gray-600 rounded-lg shadow-sm hover:bg-gray-100"
                >
                  Help?
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-black text-white rounded-lg border border-black hover:bg-white hover:text-black"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAccount;
