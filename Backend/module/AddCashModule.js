import mongoose from "mongoose";

const CashSchema = new mongoose.Schema(
  {
      totalAmount:Number,
       a2000:Number,
        a500:Number,
        a200:Number,
        a100:Number,
        a50:Number,
        a20:Number,
        a10:Number,
      times:String,
      update_ty:String,
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
