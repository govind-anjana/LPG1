import mongoose from "mongoose";

const ConsumerSchema = new mongoose.Schema(
  {
        consumerType:String,
        consumerName:String,
        mobile:Number,
        deliveryMan:String,
        oldAmount:Number,
        totalAmount:Number,
        remarks:String,
        paymentReceived:String,
        equipmentNam:String,
        currentRate:Number,
        refill:String,
        discountRate:Number,
        discount:Number,
        emptyRefill:String,
        amount:Number,
        emptyBalance:Number,
        times:String,
    date: {
      type: Date,
      default: Date.now,  
    },
  },
  {
    collection: "consumer",
    timestamps: true,
  }
);

const ConsumerModel = mongoose.model("Consumer", ConsumerSchema);
export default ConsumerModel;
