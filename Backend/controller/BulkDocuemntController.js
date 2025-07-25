import AddBulkModel from "../module/BulkDocumentModule.js";
export const BulkDocument = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddBulkModel(data);
    const saveUser = await newadd.save();
    res.status(201).json({ message: "Add Bulk Document added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const BulkDocumentList = async (req, res) => {
  try {
    const employees = await AddBulkModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteBulkDocument = async (req, res) => {
  try {
    const result = await AddBulkModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddBulkModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdateBulkDocument = async (req, res) => {
  const updated = await AddBulkModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
