/*
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [
        {
            type: String
        }
    ],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // For tracking applications
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
}, { timestamps: true });
export const Job = mongoose.model("Job", jobSchema);
*/
import mongoose from "mongoose";

// Define the Job schema
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Ensure no extra spaces around the title
    },
    description: {
      type: String,
      required: true,
      trim: true, // Trim spaces for description
    },
    requirements: [
      {
        type: String,
        trim: true, // Trim spaces for each requirement
      },
    ],
    salary: {
      type: Number,
      required: true,
      min: 0, // Ensure salary cannot be negative
    },
    location: {
      type: String,
      required: true,
      trim: true, // Trim spaces from location
    },
    jobType: {
      type: String,
      required: true,
      enum: ['full-time', 'part-time', 'contract', 'internship'], // Enum for job types
    },
    experienceLevel: {
      type: String,
      required: true,
      enum: ['junior', 'mid', 'senior'], // Enum for experience levels
    },
    position: {
      type: Number,
      required: true,
      min: 1, // At least 1 position available
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // For tracking applications
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// Indexes for performance optimization
jobSchema.index({ title: 1 });
jobSchema.index({ company: 1 });
jobSchema.index({ location: 1 });

// Virtual for populating the company's details
jobSchema.virtual('companyDetails', {
  ref: 'Company',
  localField: 'company',
  foreignField: '_id',
  justOne: true, // We expect only one company per job
});

// Model export
export const Job = mongoose.model("Job", jobSchema);
