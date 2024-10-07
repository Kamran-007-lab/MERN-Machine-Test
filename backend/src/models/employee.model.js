import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Validator for file type restriction
const fileTypeValidator = (value) => {
  return /\.(jpg|jpeg|png)$/i.test(value); // Check if the file is jpg or png
};

const employeeSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, 
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    }, 
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: fileTypeValidator,
        message: "Avatar must be a .jpg or .png file",
      },
    },
    designation: {
      type: String,
      required: true,
      enum: ["HR", "Manager", "Sales"], 
    },
    gender: {
      type: String,
      enum: ["M", "F"], 
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"], 
    },
    activeStatus: {
      type: String,
      enum: ["active", "inactive"], // Restrict values to "active" or "inactive"
      default: "active", // Set the default value to "active"
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
