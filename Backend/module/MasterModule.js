import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    agentName: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    promotionName: String,
    discount: Number,
    update_ty: String,
  },
  {
    collection: "agents",
    timestamps: true,
  }
);

const AgentModel = mongoose.model("Agents", AgentSchema);
export default AgentModel;
