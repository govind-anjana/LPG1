import mongoose from "mongoose";

const AddProSchema = new mongoose.Schema(
  {
    
    promotion: String,
    rate: Number,
    qty: String,
    description: String,
    times: String,
    update_ty:String,
  },
  {
    collection: "addpromotion",
    timestamps: true,
  }
);

const AddProModel = mongoose.model("Addpromotion", AddProSchema);
export default AddProModel;