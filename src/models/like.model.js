import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Types.ObjectId,
      ref: "Listing",
    },
    likedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
