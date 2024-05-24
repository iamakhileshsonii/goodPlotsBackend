import mongoose, { mongo } from "mongoose";

const propertyimageSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Types.ObjectId,
      ref: "Listing",
    },
    propertyImage: {
      type: String, // Fetch property image URL from cloudinary
      required: [true, "Property image is required"],
    },
  },
  { timestamps: true }
);

export const Propertyimage = mongoose.model(
  "Propertyimage",
  propertyimageSchema
);
