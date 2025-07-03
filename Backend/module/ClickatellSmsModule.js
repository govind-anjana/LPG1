import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema(
  {
     agentName: String,
      password:String,
      apiid: String,
      status: String,
      date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "clickatell",
    timestamps: true,
  }
);

const ClickModel = mongoose.model("Clickatell", ClickSchema);
export default ClickModel;