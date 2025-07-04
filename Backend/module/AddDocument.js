import mongoose from "mongoose";

const AddDocSchema = new mongoose.Schema(
  {
    connection: String,
    equipment: String,
    itemType: String,
    deliveryMan: String,
    consumerNo: Number,
    consumerName: String,
    cylQty: Number,
    prQty: Number,
    cylDeposit: Number,
    prDeposit: Number,
    advanceRecover: Number,
    docCharges: Number,
    amountPaid: Number,
    paddingA: Number,
    paymentT: String,
    discountA: Number,
    pr: Number,
    prm: Number,
    replace: String,
    replaceRate: Number,
    remarks: String,
    promotionType: String,
    finalAmount: Number,
    totalamount: Number,
    times: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "adddocument",
    timestamps: true,
  }
);

const AddDocModel = mongoose.model("Adddocument", AddDocSchema);
export default AddDocModel;
