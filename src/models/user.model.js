import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone no. is required"],
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    avatar: {
      type: String, // Fetch URL from cloudinary
      required: [true, "Avatar is required"],
    },
    coverImage: {
      type: String, // Fetch URL from cloudinary
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
