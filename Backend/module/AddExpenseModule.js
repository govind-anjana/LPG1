import mongoose from "mongoose";

const AddExpenseSchema = new mongoose.Schema(
  {
    userType: String,
    names: String,
    expenseHead: String,
    amount: Number,
    description: String,
    times: String,
    update_ty: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "expense",
    timestamps: true,
  }
);

const AddExpenseModel = mongoose.model("Expense", AddExpenseSchema);
export default AddExpenseModel;
