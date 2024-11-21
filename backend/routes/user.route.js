
import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import {singleUpload}  from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post( isAuthenticated ,singleUpload,updateProfile);

export default router;
/*
import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Register new user (no authentication required)
router.route("/register").post(singleUpload, register);

// Login user (no authentication required)
router.route("/login").post(login);

// Logout user (authentication required)
router.route("/logout").get(isAuthenticated, logout);

// Update user profile (authentication required and file upload for profile photo)
router.route("/profile/update").patch(isAuthenticated, singleUpload, updateProfile);

export default router;
*/
