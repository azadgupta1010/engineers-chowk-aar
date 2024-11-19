/*
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    } 
}, { timestamps: true });
export const Application = mongoose.model("Application", applicationSchema);
*/
import mongoose from "mongoose";

// Schema definition
const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference to Job model
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Add indexes for faster querying
applicationSchema.index({ job: 1, applicant: 1 });

// Virtual field for populating job and applicant details
applicationSchema.virtual("jobDetails", {
  ref: "Job",
  localField: "job",
  foreignField: "_id",
  justOne: true,
});

applicationSchema.virtual("applicantDetails", {
  ref: "User",
  localField: "applicant",
  foreignField: "_id",
  justOne: true,
});

// Static method to check if an applicant has already applied for a job
applicationSchema.statics.hasApplied = async function (jobId, userId) {
  const application = await this.findOne({ job: jobId, applicant: userId });
  return application !== null;
};

// Pre-save hook to do some checks or modifications before saving
applicationSchema.pre("save", function (next) {
  if (this.isNew) {
    // Custom validation logic before save (if needed)
  }
  next();
});

// Model export
export const Application = mongoose.model("Application", applicationSchema);
