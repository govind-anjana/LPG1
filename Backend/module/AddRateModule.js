
import mongoose from "mongoose";

const AddrateSchema = new mongoose.Schema({
     equipment:String,
      totalRsp:Number,
      sgst:Number,
      cgst:Number,
      basePrice:Number,
      validFrom:String,
      validTo:String,
      dates:String,
       date: {
      type: Date,
      default: Date.now,
    },
}, {
  collection: "addrate",
  timestamps: true
});

const AddModel = mongoose.model("Addrate", AddrateSchema);
export default AddModel;
