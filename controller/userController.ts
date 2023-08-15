import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import { HTTP } from "../error/mainError";
import cloudinary from "../utils/cloudinary";

export const registerUser = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });
    return res.status(HTTP.CREATE).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD).json({
      message: "error creating user",
    });
  }
};

export const signInUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { email, password } = req.body;

    const auth = await userModel.findById(userID);

    const person: any = await userModel.findOne({ email });

    if (person) {
      const pass = await bcrypt.compare(password, auth?.password!);

      if (pass) {
        return res.status(HTTP.CREATE).json({
          message: `Welcome Back ${person.name}`,
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: `${person.name} not found`,
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error creating user",
      data: error.message,
      error,
    });
  }
};

export const getOneUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user: any = await userModel.findById(userID);

    return res.status(HTTP.CREATE).json({
      message: `${user.name} gotten`,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req: any, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(HTTP.CREATE).json({
      message: "All users gotten",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { name } = req.body;
    const user: any = await userModel.findByIdAndUpdate(userID);

    return res.status(HTTP.CREATE).json({
      message: `${user.name} updated successfully`,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findByIdAndDelete(userID);

    return res.status(HTTP.CREATE).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Error deleting user",
    });
  }
};
