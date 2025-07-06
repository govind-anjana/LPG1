import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectedData = () => {
  mongoose.connect(process.env.MONGO_URL_ATLAS)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
};

export default connectedData;
