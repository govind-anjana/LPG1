import mongoose from "mongoose";

const AddNfrSchema = new mongoose.Schema(
  {
    itemGroup: String,
    vendorNames: String,
    modelName: String,
    nfrRate: Number,
    nfrRsp: Number,
    openingStock: Number,
    remarks: String,
    times: String,
    update_ty: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "addnfr",
    timestamps: true,
  }
);

const AddNfrModel = mongoose.model("Addnfr", AddNfrSchema);
export default AddNfrModel;
