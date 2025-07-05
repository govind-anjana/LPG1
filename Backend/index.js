import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import connectedData from "./config/db.js";
import path from 'path'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
const _dirname=path.resolve();
connectedData();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
// app.get('*',(_,res)=>{
//   res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
// })
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
