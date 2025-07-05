import AddExpenseHeadModel from "../module/ExpenseHeadModule.js";
export const ExpenseHead = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddExpenseHeadModel(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const ExpenseHeadList = async (req, res) => {
  try {
    const employees = await AddExpenseHeadModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteExpenseHead = async (req, res) => {
  try {
    const result = await AddExpenseHeadModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddExpenseHeadModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdateExpenseHead = async (req, res) => {
  const updated = await AddExpenseHeadModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
