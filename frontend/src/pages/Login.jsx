import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginimg from '../assets/login-img.png';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  let navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData]=useState({
    password: "",
    username: ""
  })

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange =(e) => {
    const name=e.target.name;
    let value=e.target.value;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials:"include",
    });
    const result=await response.json();
    if(response.ok){
      // sessionStorage.setItem("phoneNumber", formData.phoneNumber);
      console.log(result);
      navigate("/Home");
    }
    else{
      console.error("Failed to get response from backend in login page",result)
    }
  }



  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')` }}>
      <Navbar />
      <div className="flex h-auto py-10 items-center justify-center">
        <div
          id="card"
          className="w-full md:max-w-3xl lg:max-w-4xl bg-gray-200 rounded-3xl flex flex-col sm:flex-row font-semibold shadow-[rgba(255,255,255,0.6)_-40px_40px_40px_0px,_rgba(255,255,255,0.6)_40px_-40px_40px_0px]"
        >
        
          {/* Left Side - Illustration */}
          <div className="w-full sm:w-1/2 bg-gray-100 flex items-center justify-center rounded-l-3xl">
            <img
              src={loginimg} 
              alt="Exam Mastery Illustration"
              className="w-full h-auto rounded-l-lg"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full sm:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Login</h2>
            <p className="text-sm text-gray-500 mb-8">You are just one step away from your recordbook !!</p>

            {/* Form */}
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="sales@dealsdray.com"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••••"
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-gray-500 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800"
              >
                Sign in
              </button>
            </form>

            <div className="my-6 flex items-center justify-center">
              <span className="bg-gray-300 w-full h-px"></span>
              <span className="text-sm text-gray-500 mx-4">OR</span>
              <span className="bg-gray-300 w-full h-px"></span>
            </div>

            <button
              type="button"
              className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:text-white"
            >
              <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-5 h-5 mr-2" alt="Google" />
              Sign in with Google
            </button>

            <p className="mt-6 text-sm text-center text-gray-600">
              Are you new? <Link to="/CreateAccount" className="text-gray-500 hover:underline">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
