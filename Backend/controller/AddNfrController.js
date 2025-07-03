import AddNfrModel from "../module/AddNfrModule.js";
export const Addnfr = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddNfrModel(data);
    const saveUser = await newadd.save();
    
    res.status(201).json({ message: "Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const nfrList = async (req, res) => {
  try {
    const employees = await AddNfrModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deletenfr = async (req, res) => {
  try {
    const result = await AddNfrModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddNfrModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const nfrUpdate= async (req, res) => {
  const updated = await AddNfrModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}
