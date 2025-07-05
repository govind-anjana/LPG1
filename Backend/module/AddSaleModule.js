import mongoose from "mongoose";

const AddSaleSchema = new mongoose.Schema(
  {
    conType: String,
    model: String,
    rate: Number,
    qty: Number,
    payment: String,
    remarks: String,
    update_ty: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "addsale",
    timestamps: true,
  }
);

const AddSaleModel = mongoose.model("Addsale", AddSaleSchema);
export default AddSaleModel;
