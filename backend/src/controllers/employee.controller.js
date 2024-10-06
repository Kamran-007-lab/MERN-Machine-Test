import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Employee } from "../models/employee.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createEmployee = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, designation, gender, course } =
    req.body;
  if (
    [fullname, email, phoneNumber, designation, gender, course].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedEmployee = await Employee.findOne({
    // $or:[]
    $or: [{ email }],
  });

  if (existedEmployee) {
    throw new ApiError(409, "Someone with this username/email already exists");
  }
  //alp=avatar local path
  //curl= cover local path url
  let alp = null;

  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar &&
    req.files.avatar.length > 0
  ) {
    alp = req.files.avatar[0].path;
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
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, designation, gender, course } =
    req.body;
  const { employeeId } = req.params;

  let alp = null;
  let avatar = null;

  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar &&
    req.files.avatar.length > 0
  ) {
    alp = req.files.avatar[0].path;
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
  return res
    .status(200)
    .json(
      new ApiResponse(200, employee, "User channel fetched successfully")
    );
});

export {
  createEmployee,
  updateAccountDetails,
  getEmployeeProfile,
};
// export loginUser;
