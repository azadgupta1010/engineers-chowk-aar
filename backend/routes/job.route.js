/*
import express from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { getAllJobs, getJobById, getJobByLoggedAdminUser, postJob } from "../controllers/job.controller.js";
 
const router = express.Router();

router.route("/postjob").post( isAuthenticated , postJob);
router.route("/all").get( isAuthenticated , getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobByLoggedAdminUser);
router.route("/:id").get(isAuthenticated, getJobById);


export default router;
*/
import express from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { getAllJobs, getJobById, getJobByLoggedAdminUser, postJob } from "../controllers/job.controller.js";

const router = express.Router();

// Post a new job (authentication required)
router.route("/jobs").post(isAuthenticated, postJob);

// Get all jobs (authentication required)
router.route("/jobs").get(isAuthenticated, getAllJobs);

// Get jobs for the logged admin (authentication required)
router.route("/jobs/admin").get(isAuthenticated, getJobByLoggedAdminUser);

// Get a single job by ID (authentication required)
router.route("/jobs/:id").get(isAuthenticated, getJobById);

export default router;
