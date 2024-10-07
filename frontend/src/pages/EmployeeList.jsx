import React, { useState, useEffect } from "react";
import LoggedNavbar from "../components/LoggedNavbar";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // Page state
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [sortBy, setSortBy] = useState("createdAt"); // Sorting field
  const [sortType, setSortType] = useState(1); // Sorting order (1 for ascending, -1 for descending)

  const fetchEmployees = async (query = "", page = 1, limit = 4, sortBy = "createdAt", sortType = 1) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/employees/getAllEmployees/?query=${query}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setEmployees(result.data); // Assuming result.data contains employees and total pages
      setFilteredEmployees(result.data);
      setTotalPages(result.pagination.totalPages); // Assuming totalPages is sent by backend
    } else {
      console.error(
        "Some error occurred while fetching the employee data from backend"
      );
    }
  };

  // Format date as dd-mm-yy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  // Fetch employees on component mount or when page, sortBy, or searchQuery changes
  useEffect(() => {
    fetchEmployees(searchQuery, page, 4, sortBy, sortType); // Limit 4 employees per page
  }, [searchQuery, page, sortBy, sortType]);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle active/inactive status
  const toggleActiveStatus = async (employeeId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/employees/toggleEmployee/${employeeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      fetchEmployees(); // Refresh employees list
    } else {
      console.error(
        "Some error occurred while toggling the employee status from backend"
      );
    }
  };

  // Delete employee
  const deleteEmployee = async (employeeId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/employees/deleteEmployee/${employeeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      fetchEmployees(); // Refresh employees list
    } else {
      console.error(
        "Some error occurred while deleting the employee data from backend"
      );
    }
  };

  // Pagination controls
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/8324.png')`,
      }}
    >
      <LoggedNavbar />
      <div className="flex flex-col items-center justify-center mt-12 text-center gap-y-10">
        <h1 className="text-5xl font-bold text-gray-100">Employee List</h1>
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-11/12 max-w-7xl mb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Total Count: {filteredEmployees?.length}
            </h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="py-2 px-4 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            />

            <Link to="/CreateEmployee">
              <button className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600">
                Create Employee
              </button>
            </Link>
          </div>

          {/* Sorting Options */}
          <div className="flex justify-start items-center mb-4">
            <label className="mr-2 text-gray-800">Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="py-2 px-4 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fullname">Name</option>
              <option value="email">Email</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>

          {/* Responsive table container */}
          <div className="overflow-x-auto">
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
                {filteredEmployees?.map((employee) => (
                  <tr
                    key={employee?._id}
                    className={`text-gray-700 border-t ${
                      employee.activeStatus === "inactive" ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="py-3 px-4">{employee._id}</td>
                    <td className="py-3 px-4">
                      <img
                        src={employee?.avatar}
                        alt={`${employee.fullname}'s avatar`}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="py-3 px-4">{employee.fullname}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`mailto:${employee.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {employee.email}
                      </a>
                    </td>
                    <td className="py-3 px-4">{employee.phoneNumber}</td>
                    <td className="py-3 px-4">{employee.designation}</td>
                    <td className="py-3 px-4">{employee.gender}</td>
                    <td className="py-3 px-4">{employee.course}</td>
                    <td className="py-3 px-4">{formatDate(employee.createdAt)}</td>
                    <td className="py-3 px-4 flex gap-4">
                      <Link to={`/EditEmployee/${employee?._id}`}>
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                      </Link>
                      <button
                        className={`${
                          employee.activeStatus === "inactive"
                            ? "text-red-500 hover:underline"
                            : "text-green-500 hover:underline"
                        }`}
                        onClick={() => toggleActiveStatus(employee._id)}
                      >
                        {employee.activeStatus === "inactive"
                          ? "Inactive"
                          : "Active"}
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteEmployee(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
