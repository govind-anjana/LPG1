import AddProModel from "../module/AddPromotionModule.js";
export const AddPro = async (req, res) => {
  try {
    const data = req.body;
    const addpro = new AddProModel(data);
    const saveUser= await addpro.save();
    res.status(201).json({ message: "Agent Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const AddProList = async (req, res) => {
  try {
    const employees = await AddProModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deletePro = async (req, res) => {
  try {
    const result = await AddProModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddProModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};