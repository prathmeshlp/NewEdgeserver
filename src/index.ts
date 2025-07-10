import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import { config } from "./config";

const app = express();
app.use(
  cors({
    origin:"*",
  })
);
app.use(express.json());

// mongoose
//   .connect(config.mongodbUri)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);

// app.listen(config.port, () =>
//   console.log(`Server running on port ${config.port}`)
// );

let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(config.mongodbUri);
    isConnected = true;
    console.log("MongoDB connected");
  }
}

export default async function handler() {
  await connectDB();
}



app.get("/", (req, res) => {
  res.send("Api is running");
});
