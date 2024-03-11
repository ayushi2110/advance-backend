import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespomse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { userName, email, fullName, password } = req.body;
    [userName, email, fullName, password].some((field) => {
      if (field?.trim() === "" || field?.trim() === undefined) {
        throw new ApiError(400, "All fields are required");
      }
    });
    console.log(999);
    const userExists = await User.findOne({
      $or: [{ email }, { userName }],
    });
    if (userExists) {
      throw new ApiError(409, "User already exists");
    }
    console.log(111);
    const avatarPath = req.files?.avatar[0]?.path;
    let coverImagePath;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      coverImagePath = req.files?.coverImage[0]?.path;
    }

    const avatar = await uploadCloudinary(avatarPath);
    const coverImage = await uploadCloudinary(coverImagePath);

    if (!avatar) {
      throw new ApiError(400, "Avatar is required");
    }

    const user = await User.create({
      userName: userName.toLowerCase(),
      email,
      fullName,
      avatar: avatar?.url,
      coverImage: coverImage?.url || "",
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser)
      throw new ApiError(500, "Something went wrong, please try again");
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Unexpected error");
  }
});

export { registerUser };
