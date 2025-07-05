import AddSaleModel from "../module/AddSaleModule.js";
export const AddSale = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddSaleModel(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Add Sale Successfully", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const SaleList = async (req, res) => {
  try {
    const employees = await AddSaleModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteSale = async (req, res) => {
  try {
    const result = await AddSaleModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Refill entry not found" });
    }

    const updatedList = await AddSaleModel.find();
    res.json(updatedList);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};
export const UpdateSale = async (req, res) => {
  const updated = await AddSaleModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
