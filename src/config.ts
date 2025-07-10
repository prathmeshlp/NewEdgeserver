import dotenv from 'dotenv';
dotenv.config();


export const config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/product_db',
  port: process.env.PORT || 5000,
  clientUri: "https://new-edgeclient.vercel.app"
};