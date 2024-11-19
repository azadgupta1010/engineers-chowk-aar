/*
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Only for employers
        profilePhoto: {
            type: String,
            default: ""
        },
    },
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);
*/
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Profile Sub-Schema
const profileSchema = new mongoose.Schema({
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, // URL to resume file
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Only for employers
    profilePhoto: {
        type: String,
        default: ""
    },
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email validation regex
    },
    phoneNumber: {
      type: Number,
      required: true,
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v); // Basic phone number validation for 10-digit numbers
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'recruiter'],
      required: true,
    },
    profile: profileSchema, // Embedding profile sub-schema
  },
  { timestamps: true }
);

// Password Hashing before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password during login
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create Index for email
userSchema.index({ email: 1 });

export const User = mongoose.model("User", userSchema);
