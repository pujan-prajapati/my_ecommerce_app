import {
  generateAccessToken,
  generateRefreshToken,
  User,
} from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendMail.js";

//user registration
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobile, password, role, address } =
    req.body;

  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new Error("User Already Exists");
  }

  const findUserByMobile = await User.findOne({ mobile });
  if (findUserByMobile) {
    throw new Error("User with this mobile number already exists");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new Error("Avatar local path is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath, "avatars");

  if (!avatar) {
    throw new Error("Avatar upload failed");
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    mobile,
    password,
    role,
    address,
    avatar: avatar.url,
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  await createdUser.save();

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Created Successfully"));
});

//user login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser._id);
    const accessToken = await generateAccessToken(findUser._id);

    const options = {
      secure: true,
      httpOnly: true,
    };

    const loggedInUser = await User.findById(findUser._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "Login Successful"
        )
      );
  } else {
    throw new Error("Invalid Credentials");
  }
});

//get all admin
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admin = await User.find({ role: "admin" });

  if (!admin) {
    throw new Error("No Admin Found");
  }
  res.status(200).json(admin);
});

//get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" });

  if (!users) {
    throw new Error("No Users Found");
  }

  res.status(200).json(users);
});

//logout user
export const logoutUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(
    _id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout Success"));
});

//delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findUser = await User.findById(id);
  if (findUser) {
    try {
      if (findUser.avatar) {
        await deleteFromCloudinary(findUser.avatar);
      }

      const deletedUser = await User.findByIdAndDelete(id);

      return res
        .status(200)
        .json(new ApiResponse(200, deletedUser, "User Deleted Successfully"));
    } catch (error) {
      throw new Error("Failed to deleted user");
    }
  } else {
    throw new Error("User Not Found");
  }
});

//update user status (admin or user)
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    throw new Error("Role is required");
  }

  const findUser = await User.findById(id);
  if (findUser) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedUser, "User Status Updated Successfully")
        );
    } catch (error) {
      throw new Error("Failed to update user status");
    }
  } else {
    throw new Error("User Not Found");
  }
});

//forget password
export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new Error("Email doesn't exist");
  }

  const otp = generateOTP();
  const optExpiry = Date.now() + 5 * 60 * 1000;

  findUser.otp = otp;
  findUser.otpExpiry = optExpiry;
  await findUser.save();

  const subject = "Password Reset OTP";
  const text = `Your OTP for password reset is ${otp}`;
  const html = `
  <h1>Password Reset OTP</h1>
  <p>Your OTP for password reset is <strong>${otp}</strong></p>
  <p>OTP will expire in 5 minutes</p>
  `;

  await sendEmail(process.env.EMAIL_ADMIN, findUser.email, subject, text, html);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: findUser, otp, optExpiry },
        "OTP Sent Successfully"
      )
    );
});

const generateOTP = () => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  return otp;
};

//verify otp
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new Error("Email doesn't exist");
  }

  if (findUser.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (findUser.otpExpiry < Date.now()) {
    throw new Error("OTP Expired");
  }

  findUser.otp = null;
  findUser.otpExpiry = null;
  await findUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, findUser, "OTP Verified Successfully"));
});

//change password
export const changePassowrd = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new Error("User not found");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Password doesn't match");
  }

  findUser.password = newPassword;
  await findUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, findUser, "Password Changed Successfully"));
});
