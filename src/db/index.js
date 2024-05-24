import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"; // Assuming DB_NAME is defined in the constant.js file

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
    console.log("🚀 DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("ERROR CONNECTING WITH DATABASE", error);
  }
};

export { connectDB };
