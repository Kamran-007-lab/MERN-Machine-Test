import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const registerEmployee = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    // $or:[]
    $or: [{ username }, { email }],
  });

  if (existedUser) {
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

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdemployee = await Employee.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdemployeer) {
    throw new ApiError(500, "Something went wrong while registering the employee");
  }

  // return res.status(201).json({createduser}) This is also correct but not structured
  return res
    .status(201)
    .json(new ApiResponse(200, createdemployee, "Employee registered successfully"));
});

const updateAccountDetails =  asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  if (!fullname || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  //alp=avatar local path
  const alp = req.file?.path;
  if (!alp) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const avatar = await uploadOnCloudinary(alp);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading Avatar");
  }
  const user=await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");
  return res.status(200).json(new ApiResponse(200,user,"Avatar updated successfully"))
});



const getEmployeeProfile = asyncHandler(async(req,res) =>{
  const {username}=req.params;

  if(!username?.trim()){
    throw new ApiError(400,"Username is missing")
  }
  const channel=await User.aggregate([
      {
        $match :{
          username: username?.toLowerCase()
        }
      },
      {
        $lookup: {
          from: "subscriptions",
          localField:"_id",
          foreignField:"channel",
          as:"subscribers"
        }
      },
      {
        $lookup: {
          from: "subscriptions",
          localField:"_id",
          foreignField:"subscriber",
          as:"subscribedTo"
        }
      },
      {
        $addFields: {
          subscribersCount: {
            $size: "$subscribers"
          },
          channelsSubscribedToCount: {
            $size: "$subscribedTo"
          },
          isSubscribed:{
            $cond :{
              if:{$in:[req.user?._id,"$subscribers.subscriber"]},
              then: true,
              else: false
            }
          }
        }
      },
      {
        $project: {
          fullname:1,
          username:1,
          subscribersCount:1,
          channelsSubscribedToCount:1,
          isSubscribed:1,
          avatar:1,
          coverImage:1,
          email:1

        }
      }

  ])
  
  if(!channel?.length){
    throw new ApiError(404,"Channel does not exists")
  }

  return res.status(200).json(
    new ApiResponse(200,channel[0],"User channel fetched successfully")
  )



})





export {
  registerEmployee,
  updateAccountDetails,
  updateUserAvatar,
  getEmployeeProfile,
};
// export loginUser;
