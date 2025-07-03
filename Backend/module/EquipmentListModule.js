import mongoose from "mongoose";

const EquSchema = new mongoose.Schema(
  {
    eqID: Number,
    eqp_sale: Number,
    eqCode: String,
    eqName: String,
    eqItemGroup: String,
    eqDef: Number,
    conType: Number,
    op_stock: Number,
    update_flag: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "equipment",
    timestamps: true,
  }
);

const EquipmentModel = mongoose.model("Equipment", EquSchema);
export default EquipmentModel;
