import CurrentModel from "../module/CurrentStockModule.js";
export const CurrentStock = async (req, res) => {
  try {
    const employees = await CurrentModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteStock = async (req, res) => {
  try {
    const result = await CurrentModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedList = await CurrentModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdateStock = async (req, res) => {
  const updated = await CurrentModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};