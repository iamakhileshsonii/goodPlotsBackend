import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

likeSchema.plugin(mongooseAggregatePaginate);

export const Like = mongoose.model("Like", likeSchema);
