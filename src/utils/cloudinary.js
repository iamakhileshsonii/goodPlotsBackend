import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (LocalFilePath) => {
  if (!LocalFilePath) return null;

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.envCLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const UploadResult = cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });

    console.log(UploadResult);
    fs.unlinkSync(LocalFilePath);

    return UploadResult;
  } catch (error) {
    fs.unlinkSync(LocalFilePath);
    console.log("ERROR CONNECTING WITH CLOUDINARY", error);
    return null;
  }
};

export { uploadOnCloudinary };
