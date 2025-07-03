import ConsumerModel from "../module/AddConsumerModule.js";
export const AddConsumer = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new ConsumerModel(data);
    const saveUser = await newadd.save();
        console.log(saveUser)
    res.status(201).json({ message: "Add Consumer", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const ConsumerList = async (req, res) => {
  try {
    const employees = await ConsumerModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteconsumer = async (req, res) => {
  try {
    const result = await ConsumerModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Consumer entry not found" });
    }

    const updatedList = await ConsumerModel.find(); 
    res.json(updatedList);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};
