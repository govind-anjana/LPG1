import AddDeliveryModel from "../module/AddDeliveryModule.js";
export const AddDelivery = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddDeliveryModel(data);
    const saveUser = await newadd.save();
    console.log(saveUser);
    res.status(201).json({ message: "Add Delivery Successfully", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const DeliveryList = async (req, res) => {
  try {
    const employees = await AddDeliveryModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteDelivery = async (req, res) => {
  try {
    const result = await AddDeliveryModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddDeliveryModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
