import mongoose from "mongoose";

const AddKgSchema = new mongoose.Schema(
  { 
    consumerName:String,    
     equipment:String,
      deliveryMan:String,
      currentRate:Number,
      refill:Number,
      discountRate:Number,
      discount:Number,
      emptyRefill:String,
      paymentReceived:Number,
      totalAmount:Number,
      emptyBalance:Number,
      oldAmountBalance:Number,
      remainingAmountBalance:Number,
      remarks:String,
    date: {
      type: Date,
      default: Date.now,  
    },
  },
  {
    collection: "kgrefill",
    timestamps: true,
  }
);

const AddKgModel = mongoose.model("Kgrefill", AddKgSchema);
export default AddKgModel;
