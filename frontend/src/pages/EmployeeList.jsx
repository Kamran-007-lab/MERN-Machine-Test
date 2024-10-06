import React, { useState } from "react";
import Navbar from "../components/Navbar";

const EmployeeList = () => {
  // Sample employee data with image URLs
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Hukum",
      email: "hcgupta@cstech.in",
      mobile: "954010044",
      designation: "HR",
      gender: "Male",
      course: "MCA",
      createDate: "13-Feb-21",
      isActive: true,
      image: "https://i.pravatar.cc/150?img=1", // Sample avatar image
    },
    {
      id: 2,
      name: "Manish",
      email: "manish@cstech.in",
      mobile: "954010033",
      designation: "Sales",
      gender: "Male",
      course: "BCA",
      createDate: "12-Feb-21",
      isActive: true,
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Yash",
      email: "yash@cstech.in",
      mobile: "954010022",
      designation: "Manager",
      gender: "Male",
      course: "BSC",
      createDate: "11-Feb-21",
      isActive: false,
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Abhishek",
      email: "abhishek@cstech.in",
      mobile: "954010033",
      designation: "HR",
      gender: "Male",
      course: "MCA",
      createDate: "13-Feb-21",
      isActive: true,
      image: "https://i.pravatar.cc/150?img=4",
    },
  ]);

  // Toggle active/deactive state
  const toggleActiveStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
      }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-12 text-center gap-y-10">
        <h1 className="text-5xl font-bold text-gray-100">Employee List</h1>
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-11/12 max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Total Count: {employees.length}</h2>
            <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Create Employee
            </button>
          </div>
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-4">Unique ID</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Mobile No</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Create Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className={`text-gray-700 border-t ${
                    !employee.isActive ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="py-3 px-4">{employee.id}</td>
                  <td className="py-3 px-4">
                    <img
                      src={employee.image}
                      alt={`${employee.name}'s avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4">{employee.name}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {employee.email}
                    </a>
                  </td>
                  <td className="py-3 px-4">{employee.mobile}</td>
                  <td className="py-3 px-4">{employee.designation}</td>
                  <td className="py-3 px-4">{employee.gender}</td>
                  <td className="py-3 px-4">{employee.course}</td>
                  <td className="py-3 px-4">{employee.createDate}</td>
                  <td className="py-3 px-4 flex gap-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => console.log("Edit Employee", employee.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${
                        employee.isActive
                          ? "text-red-500 hover:underline"
                          : "text-green-500 hover:underline"
                      }`}
                      onClick={() => toggleActiveStatus(employee.id)}
                    >
                      {employee.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
