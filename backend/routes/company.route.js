/*
import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompanyInformation } from "../controllers/company.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post( isAuthenticated ,registerCompany);
router.route("/getcompany").get( isAuthenticated ,getCompany);
router.route("/getcompany/:id").get( isAuthenticated ,getCompanyById);
router.route("/update/:id").put( isAuthenticated,singleUpload, updateCompanyInformation);

export default router;
*/
import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompanyInformation } from "../controllers/company.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Register a new company (authentication required)
router.route("/companies").post(isAuthenticated, registerCompany);

// Get all companies (authentication required)
router.route("/companies").get(isAuthenticated, getCompany);

// Get a specific company by ID (authentication required)
router.route("/companies/:id").get(isAuthenticated, getCompanyById);

// Update company information (authentication required)
router.route("/companies/:id").put(isAuthenticated, singleUpload, updateCompanyInformation);

export default router;
