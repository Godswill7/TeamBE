import express, { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  registerUser,
  signInUser,
  updateUser,
} from "../controller/userController";
import { avatar } from "../utils/multer";

const router: Router = express.Router();

router.route("/register").post(avatar, registerUser);
router.route("/:userID/sign-in").post(signInUser);
router.route("/:userID/get-one").get(getOneUser);
router.route("/all-users").get(getAllUsers);
router.route("/:userID/delete-user").delete(deleteUser);
router.route("/:userID/update-user").patch(updateUser);

export default router;
