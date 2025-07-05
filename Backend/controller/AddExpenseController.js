import AddExpenseModel from "../module/AddExpenseModule.js";

export const AddExpense = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddExpenseModel(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const ExpenseList = async (req, res) => {
  try {
    const employees = await AddExpenseModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteExpense = async (req, res) => {
  try {
    const result = await AddExpenseModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddExpenseModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const UpdateAddExpense = async (req, res) => {
  const updated = await AddExpenseModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
