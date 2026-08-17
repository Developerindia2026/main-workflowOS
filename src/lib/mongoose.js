import mongoose from "mongoose";

export default async function connectDB() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(mongoURI);

  console.log("DATABASE CONNECTED WITH WORKFLOW-OS");
}
