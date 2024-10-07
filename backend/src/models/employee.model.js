import mongoose, { Schema } from "mongoose";

const fileTypeValidator = (value) => {
  return /\.(jpg|jpeg|png)$/i.test(value); 
};

const phoneNumberValidator = (value) => {
  return /^\d{10}$/.test(value); 
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
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ], 
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: phoneNumberValidator,
        message: "Phone number must be 10 digits", 
      },
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
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
