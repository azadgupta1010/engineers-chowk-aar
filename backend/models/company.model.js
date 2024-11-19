
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String
    }, // URL to company logo
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, { timestamps: true });
export const Company = mongoose.model("Company", companySchema);
/*
import mongoose from "mongoose";

// Schema definition for Company
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure company names are unique
    },
    description: {
      type: String,
    },
    website: {
      type: String,
      validate: {
        validator: function(v) {
          // Simple regex to check if it's a valid URL
          return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i.test(v);
        },
        message: props => `${props.value} is not a valid URL`
      },
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
      validate: {
        validator: function(v) {
          // Simple regex to check if it's a valid URL
          return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i.test(v);
        },
        message: props => `${props.value} is not a valid URL`
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Indexing the `name` field for faster search
companySchema.index({ name: 1 });

// Virtual field for populating user details
companySchema.virtual("userDetails", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

// Model export
export const Company = mongoose.model("Company", companySchema);
*/
