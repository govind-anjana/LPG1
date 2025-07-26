import ItemModel from "../module/ItemGroupModule.js";
export const ItemGroup = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new ItemModel(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Item Group added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const ItemGroupList = async (req, res) => {
  try {
    const employees = await ItemModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteItemGroup = async (req, res) => {
  try {
    const result = await ItemModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await ItemModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdateItemGroup = async (req, res) => {
  const updated = await ItemModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
