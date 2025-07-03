import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import connectedData from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
connectedData();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
