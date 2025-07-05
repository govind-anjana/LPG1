import PlantModel from "../module/PlantTranModule.js";
export const PlantTran = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new PlantModel(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Penalty added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const PlantList = async (req, res) => {
  try {
    const employees = await PlantModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deletePlant = async (req, res) => {
  try {
    const result = await PlantModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await PlantModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdatePlant = async (req, res) => {
  const updated = await PlantModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};