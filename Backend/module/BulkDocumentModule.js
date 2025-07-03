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
    amountDeposit: Number,
    amountDeposit: Number,
    svDiscount: Number,
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
