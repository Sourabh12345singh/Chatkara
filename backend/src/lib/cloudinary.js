import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
  api_key: process.env.CLOUDINAR_API_KEY,
  api_secret: process.env.CLOUDINAR_API_SECRET,
});
// console.log("Cloudinary Config:");
// console.log("Cloud Name:", process.env.CLOUDINAR_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINAR_API_KEY);
// console.log("API Secret:", process.env.CLOUDINAR_API_SECRET ? "Loaded" : "Not Loaded");


export default cloudinary;
