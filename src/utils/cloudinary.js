import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

//File uploaded on Cloudinary

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("successfully uploaded");
    response.url();
    return response;
  } catch (error) {
    //removed locallly saved temporty file as the upload operation failed
    fs.unlinkSync(localFilePath);
  }
};
