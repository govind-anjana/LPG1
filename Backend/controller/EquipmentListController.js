import EquipmentModel from "../module/EquipmentListModule.js";

export const EquiepmentList = async (req, res) => {
  try {
    const  employee= await EquipmentModel.find();
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteEqu = async (req, res) => {
  try {
    const result = await EquipmentModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedList = await EquipmentModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const EquipmentId=async (req, res) => {
  const emp = await EquipmentModel.findById(req.params.id);
  res.json(emp);
};
export const EquipmentUpdate= async (req, res) => {
  const updated = await EquipmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}
