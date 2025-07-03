import mongoose from "mongoose";

const AddDocSchema = new mongoose.Schema(
  {
    connection: String,
    equipment: String,
    itemType: String,
    deliveryMan:String,
    consumerNo:Number,
    consumerName:String,
    cylQty:Number,
    prQty:Number,
    cylDeposit:Number,
    prDeposit:Number,
    advanceRecover:Number,
    docCharges:Number,
    amountPaid:Number,
    remarks:String,
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
