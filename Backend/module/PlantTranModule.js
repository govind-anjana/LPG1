import mongoose from "mongoose";

const PlantTranSchema = new mongoose.Schema(
  {
    ReDate: String,
    selectedEquipment: String,
    qty: Number,
    emptyQty: Number,
    remarks: String,
    invoice: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "planttransaction",
    timestamps: true,
  }
);

const PlantModel = mongoose.model("Planttransaction", PlantTranSchema);
export default PlantModel;
