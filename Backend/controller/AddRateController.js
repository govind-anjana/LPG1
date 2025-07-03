import AddModel from "../module/AddRateModule.js";
// const moment = require("moment-timezone");
export const AddRateEmployee = async (req, res) => {
  try {
    const data = req.body;
    const newadd = new AddModel(data);
    const saveUser= await newadd.save();
    console.log(saveUser);
    res.status(201).json({ message: "Employee added"});
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const AddRateList = async (req, res) => {
  try {
    const employees = await AddModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteRate = async (req, res) => {
  try {
    const result = await AddModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};