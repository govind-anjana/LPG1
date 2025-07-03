import CashModel from "../module/AddCashModule.js";
export const AddCash = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new CashModel(data);
    const saveUser = await newadd.save();
        console.log(saveUser)
    res.status(201).json({ message: "Add Cash", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const CashList = async (req, res) => {
  try {
    const employees = await CashModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteCash = async (req, res) => {
  try {
    const result = await CashModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Consumer entry not found" });
    }
    const updatedList = await CashModel.find(); 
    res.json(updatedList);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};
