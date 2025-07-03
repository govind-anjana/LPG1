import mongoose from "mongoose";

const AddHeadSchema = new mongoose.Schema(
  {
    expenseType: String,
    expenseH: String,
    description: String,
    update_ty: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "expensehead",
    timestamps: true,
  }
);

const AddExpenseHeadModel = mongoose.model("Expensehead", AddHeadSchema);
export default AddExpenseHeadModel;
