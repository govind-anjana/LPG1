import mongoose from "mongoose";

const PenaltySchema = new mongoose.Schema(
  {
         employeeName:String,
        amount:Number,
        remarks:String,
  },
  {
    collection: "penalty",
    timestamps: true,
  }
);

const PenaltyModel = mongoose.model("penalty", PenaltySchema);

export default PenaltyModel;
