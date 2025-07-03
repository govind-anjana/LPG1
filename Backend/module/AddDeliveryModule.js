import mongoose from "mongoose";

const AddDeliverySchema = new mongoose.Schema(
  {
    validTo: String,
    currentRate: String,
    dmanID: String,
    equipment: String,
    totalCylinder: Number,
    refill: Number,
    newConnection: Number,
    remainingAmount: Number,
    remainingCylinder: Number,
    paymentType: String,
    cylinderQty: Number,
    onlinePayments: Number,
    onlineExtraAmount: Number,
    totalAmount: Number,
    paidAmount: Number,
    times:String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "delivery",
    timestamps: true,
  }
);

const AddDeliveryModel = mongoose.model("Delivery", AddDeliverySchema);
export default AddDeliveryModel;
