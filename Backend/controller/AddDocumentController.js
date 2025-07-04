import AddDocModel from "../module/AddDocument.js";
export const AddDoc = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddDocModel(data);
    const saveUser = await newadd.save();
        console.log(saveUser)
    res.status(201).json({ message: "Add Document", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const DocList = async (req, res) => {
  try {
    const employees = await AddDocModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteDoc = async (req, res) => {
  try {
    const result = await AddDocModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Refill entry not found" });
    }

    const updatedList = await AddDocModel.find(); 
    res.json(updatedList);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateDoc= async (req, res) => {
  const updated = await AddDocModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}

