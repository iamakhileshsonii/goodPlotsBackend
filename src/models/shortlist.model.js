import mongoose from "mongoose";

const shortlistSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Types.ObjectId,
      ref: "Listing",
    },
    shortlistedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Shortlist = mongoose.model("Shortlist", shortlistSchema);
