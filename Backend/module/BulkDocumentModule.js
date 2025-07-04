import mongoose from "mongoose";

const AddBulkSchema = new mongoose.Schema(
  {
    agentName: String,
    promotionType: String,
    documentSubmit: String,
    svPrepared: String,
    cylinderIssue: String,
    prIssue: Number,
    rtIssue: Number,
    amountDeposit: Number,
    svDiscount: Number,
    update_ty: String,
    times: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "bulkdocument",
    timestamps: true,
  }
);

const AddBulkModel = mongoose.model("bulkdocument", AddBulkSchema);
export default AddBulkModel;
