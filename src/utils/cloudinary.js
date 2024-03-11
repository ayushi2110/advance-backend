import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

const uploadCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;
    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localPath);
    return result;
  } catch (error) {
    fs.unlinkSync(localPath);
    throw new Error(error?.message);
  }
};

export { uploadCloudinary };
