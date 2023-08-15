import mongoose from "mongoose";

export interface iUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
}

interface iUserData extends iUser, mongoose.Document {}

const userSchema = new mongoose.Schema<iUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<iUserData>("users", userSchema);

export default userModel;
