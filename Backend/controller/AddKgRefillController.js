import AddKgModel from "../module/AddKgRefill.js";
export const AddKgrefill = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddKgModel(data);
    const saveUser = await newadd.save();
        console.log(saveUser)
    res.status(201).json({ message: "Add Kg Refill", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const KgrefillList = async (req, res) => {
  try {
    const employees = await AddKgModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deletekgrefill = async (req, res) => {
  try {
    const result = await AddKgModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Refill entry not found" });
    }

    const updatedList = await AddKgModel.find(); 
    res.json(updatedList);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};
