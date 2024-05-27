import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

// GENERATE ACCESS & REFRESH TOKEN
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating Access & Refresh Tokens ||| ${error}`
    );
  }
};

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password, phone, role } = req.body;

  // Check if any of the required field is empty
  if (
    [username, email, fullname, password, phone, role].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(401, "All fields are required!!!");
  }

  // User with email already exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new ApiError(409, "User with email already exists!!!");
  }

  const user = await User.create({
    username: username,
    email: email,
    fullname: fullname,
    password: password,
    phone: phone,
    role: role,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -accessToken"
  );

  if (!createdUser) {
    throw new ApiError(409, "Unable to create new user!!!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  // Get email and password
  // Check if user with email already exist
  // Check if the password provided by the user is correct
  // Login user

  const { email, password } = req.body;

  if ([email, password].some((field) => !field || field.trim === "")) {
    throw new ApiError(401, "All fields are required!!!");
  }

  const user = await User.findOne({ email });

  console.log("USER::: \n", user);

  if (!user) {
    throw new ApiError(401, "User with not found!!!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is invalid!!!");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("USER ID :::: ", user?._id);

  // Generate accessToken
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "User logged in successfully"
      )
    );
});

// LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { $new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearcookie("accesToken", options)
    .clearcookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// UPDATE PASSWORD
const updatePassword = asyncHandler(async (req, res) => {
  // Check if the new password is not same as old password
  // Update password

  const { oldPassword, newPassword } = req.body;

  if (
    [oldPassword, newPassword].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required!!!");
  }

  const isPasswordValid = user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(409, "Password is incorrect!!!");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(
      409,
      "New password should be different from old password!!!"
    );
  }

  const user = User.findByIdAndUpdate;

  user.password = newPassword;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

//GET CURRENT USER INFO
const currentUserInfo = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current user information fetched successfully"
      )
    );
});

// UPDATE AVATAR
const updateAvatar = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new ApiError(404, "Avatar file not found!!!");
  }

  const newAvatar = await uploadOnCloudinary(localFilePath);
  const updateNewAvatar = await User.findByIdAndUpdate(
    req.user?._id,
    {
      avatar: newAvatar.url,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateNewAvatar, "Avatar updated successfully"));
});

export {
  generateAccessAndRefreshToken,
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateAvatar,
  currentUserInfo,
};
