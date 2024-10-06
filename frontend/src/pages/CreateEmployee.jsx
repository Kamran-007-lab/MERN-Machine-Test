import React, { useState } from "react";
import LoggedNavbar from "../components/LoggedNavbar";

const CreateEmployee = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "Male",
    course: "", // Only one course can be selected at a time
    image: null,
  });

  // Input change handler for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle course selection as checkboxes but limit to one selection
  const handleCourseChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      course: value, // Set only one course value at a time
    }));
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
      }}
    >
      <LoggedNavbar />
      <div className="flex flex-col items-center justify-center mt-6 text-center gap-y-10">
        <h1 className="text-5xl font-bold text-gray-100">Create Employee</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-4xl"
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mobile No */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Mobile No
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Designation Dropdown */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Gender Radio Buttons */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            {/* Courses Checkboxes (allow only one selection at a time) */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Course
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    checked={formData.course === "MCA"}
                    onChange={handleCourseChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">MCA</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    checked={formData.course === "BCA"}
                    onChange={handleCourseChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">BCA</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="course"
                    value="BSC"
                    checked={formData.course === "BSC"}
                    onChange={handleCourseChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">BSC</span>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-left text-gray-700 font-bold mb-2">
                Image Upload
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
