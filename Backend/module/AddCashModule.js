import mongoose from "mongoose";

const CashSchema = new mongoose.Schema(
  {
      totalAmount:Number,
    date: {
      type: Date,
      default: Date.now,  
    },
  },
  {
    collection: "cash",
    timestamps: true,
  }
);

const CashModel = mongoose.model("Cash", CashSchema);
export default CashModel;
