import mongoose from "mongoose";

const DepositSchema = new mongoose.Schema(
  {
    userType:String,
    equipmentType:String,
    employeeName:String,
    equipment:String,
    depositCyl:String,
    remarks:String,
    update_ty:String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "deposit",
    timestamps: true,
  }
);

const AddDepositModel = mongoose.model("Deposit", DepositSchema);
export default AddDepositModel;
