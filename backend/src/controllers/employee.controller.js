import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Employee } from "../models/employee.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createEmployee = asyncHandler(async (req, res) => {
  // console.log("Hello", req.body, "File", req.file);
  const { fullname, email, phoneNumber, designation, gender, course } =
    req.body;
  if (
    [fullname, email, phoneNumber, designation, gender, course].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const existedEmployee = await Employee.findOne({
      // $or:[]
      $or: [{ email }],
    });

    if (existedEmployee) {
      throw new ApiError(
        409,
        "Someone with this username/email already exists"
      );
    }
    //alp=avatar local path
    //curl= cover local path url
    let alp = null;

    if (req.file && req.file.path.length > 0) {
      alp = req.file.path;
    }

    // console.log(req.files)

    if (!alp) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(alp);

    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }

    const employee = await Employee.create({
      fullname,
      avatar: avatar.url,
      email,
      designation,
      phoneNumber,
      gender,
      course,
    });

    if (!employee) {
      throw new ApiError(
        500,
        "Something went wrong while registering the employee"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, employee, "Employee registered successfully"));
  } catch (error) {
    console.error("Error", error);
  }
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, designation, gender, course } =
    req.body;
  const { employeeId } = req.params;

  let alp = null;
  let avatar = null;

  if (req.file && req.file.path.length > 0) {
    alp = req.file.path;
  }

  // console.log(req.files)

  if (alp) {
    avatar = await uploadOnCloudinary(alp);
  }
  const updateFields = {};

  if (fullname) updateFields.fullname = fullname;
  if (email) updateFields.email = email;
  if (phoneNumber) updateFields.phoneNumber = phoneNumber;
  if (designation) updateFields.designation = designation;
  if (gender) updateFields.gender = gender;
  if (course) updateFields.course = course;
  if (avatar) updateFields.avatar = avatar;
  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  // Update the employee record with the provided fields
  const employee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      $set: updateFields,
    },
    { new: true }
  );

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, employee, "Account details updated successfully")
    );
});

const getEmployeeProfile = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId?.trim()) {
    throw new ApiError(400, "Employee id  is missing");
  }

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new ApiError(404, "Employee does not exists");
  }
  return res.status(200).json(new ApiResponse(200, employee, "Employee"));
});
const getAllEmployees = asyncHandler(async (req, res) => {
  const {
    page = 1, // Default to page 1 if not provided
    limit = 5, // Default to 5 documents per page if not provided
    query = "",
    sortBy = "createdAt",
    sortType = 1,
  } = req.query;

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);
  const parsedSortType = parseInt(sortType, 10);

  // Create the aggregation pipeline with search, sort, skip, and limit
  const employeeAggregate = Employee.aggregate([
    {
      $match: {
        $or: [
          { fullname: { $regex: query, $options: "i" } }, // Case-insensitive search for fullname
        ],
      },
    },
    {
      $sort: { [sortBy]: parsedSortType }, // Sort by specified field
    },
    {
      $skip: (parsedPage - 1) * parsedLimit, // Skip documents for pagination
    },
    {
      $limit: parsedLimit, // Limit documents to return per page
    },
  ]);

  // Execute the aggregation
  const employees = await employeeAggregate.exec();

  // Get total count for pagination
  const totalEmployees = await Employee.countDocuments({
    fullname: { $regex: query, $options: "i" },
  });

  // Check if employees are found
  if (!employees) {
    throw new ApiError(404, "Something went wrong while fetching employees");
  }

  // Calculate total pages
  console.log("Here");
  const totalPages = Math.ceil(totalEmployees / parsedLimit);

  // Return paginated employees

  return res.status(200).json({
    success: true,
    data: employees,
    pagination: {
      totalEmployees, // Total number of employees found
      totalPages, // Total pages
      currentPage: parsedPage, // Current page
      limit: parsedLimit, // Employees per page
    },
    message: "Employees fetched successfully",
  });
});

const toggleEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId?.trim()) {
    throw new ApiError(400, "Employee id  is missing");
  }

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new ApiError(404, "Employee does not exists");
  }
  const newStatus = employee.activeStatus === "active" ? "inactive" : "active";

  employee.activeStatus = newStatus;
  await employee.save();

  return res.status(200).json(new ApiResponse(200, employee, "Employee"));
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  // console.log(req.params);
  if (!employeeId?.trim()) {
    throw new ApiError(400, "Employee id  is missing");
  }

  const employee = await Employee.findByIdAndDelete(employeeId);
  // console.log("241");  
  if (!employee) {
    throw new ApiError(404, "Employee does not exists");
  }

  return res.status(200).json(new ApiResponse(200, employee, "Employee deleted successfully"));
});

export {
  createEmployee,
  updateAccountDetails,
  getEmployeeProfile,
  getAllEmployees,
  toggleEmployee,
  deleteEmployee
};
// export loginUser;
