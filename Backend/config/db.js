import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectedData = () => {
  mongoose.connect(
    "mongodb+srv://govindanjana2004:RwdUc5ttwPHlEJwm@test.2tgtdvc.mongodb.net/lpgdb?retryWrites=true&w=majority&appName=test"
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
};

export default connectedData;
