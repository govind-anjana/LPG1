import PenaltyModel from "../module/PenaltyModule.js";
export const AddPenalty = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new PenaltyModel(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Penalty added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const PenaltyList = async (req, res) => {
  try {
    const employees = await PenaltyModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deletePenalty = async (req, res) => {
  try {
    const result = await PenaltyModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await PenaltyModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const UpdatePanalty = async (req, res) => {
  const updated = await PenaltyModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};