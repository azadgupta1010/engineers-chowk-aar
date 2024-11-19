/*
import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
*/
import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";

const router = express.Router();

// Apply for a job (authentication required)
router.route("/applications/:id").post(isAuthenticated, applyJob);

// Get all jobs applied by the current user (authentication required)
router.route("/applications").get(isAuthenticated, getAppliedJobs);

// Get all applicants for a specific job (authentication required)
router.route("/applications/:id/applicants").get(isAuthenticated, getApplicants);

// Update application status (authentication required)
router.route("/applications/:id/status").put(isAuthenticated, updateStatus);

export default router;
