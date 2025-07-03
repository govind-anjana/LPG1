import AddDepositModel from "../module/DepositModule.js";
export const AddDeposit = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddDepositModel(data);
    const saveUser = await newadd.save();
    console.log(saveUser);
    res.status(201).json({ message: "Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const DepositList = async (req, res) => {
  try {
    const employees = await AddDepositModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteDepoit = async (req, res) => {
  try {
    const result = await AddDepositModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddDepositModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
