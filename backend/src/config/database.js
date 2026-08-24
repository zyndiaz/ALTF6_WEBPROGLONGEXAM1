import mongoose from "mongoose";

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing. Create backend/.env from .env.example.");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
}
