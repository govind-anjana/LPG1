import mongoose from "mongoose";

const CurrentSchema = new mongoose.Schema(
  {
    sr: Number,
    date: String,
    eqID: Number,
    op_Stock: Number,
    issue_Qty: Number,
    rcpt_Qty: Number,
    cls_Stock: Number,
    update_flag: String,
    created_at: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "current_stock",
    timestamps: true,
  }
);

const CurrentModel = mongoose.model("Current_stock", CurrentSchema);
export default CurrentModel;
