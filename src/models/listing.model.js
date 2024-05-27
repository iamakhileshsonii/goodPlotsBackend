import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const listingSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      required: [true, "Property type is required"], // Residential, Commercial, Industrial, Agriculture, Riverbed, Island
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    propertySubtype: {
      type: String,
      required: [true, "Property Subtype is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    totalArea: {
      type: String,
      required: [true, "Total area is required"],
    },
    expectedPrice: {
      type: String,
      required: [true, "Expected price is required"],
    },
    isNegotiable: {
      type: Boolean,
    },
    propertyImage: {
      type: String, // Fetch URL from cloudinary
    },
    listingStatus: {
      type: String,
      default: "pending",
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

listingSchema.plugin(mongooseAggregatePaginate);

export const Listing = mongoose.model("LIsting", listingSchema);
