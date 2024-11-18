/*
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});
export default cloudinary;
*/
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Check if required environment variables are available
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error('Cloudinary configuration is missing. Ensure CLOUD_NAME, API_KEY, and API_SECRET are set in the .env file.');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export default cloudinary;
