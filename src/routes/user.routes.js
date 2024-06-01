import { Router } from "express";

const router = Router();

//Import Routes
import {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateAvatar,
  currentUserInfo,
  getAllUsersData,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-password").post(verifyJWT, updatePassword);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/user-profile").get(verifyJWT, currentUserInfo);

router.route("/get-all-users").get(getAllUsersData);
export default router;

// Route: localhost://9001/
