import CurrentModel from "../module/CurrentStockModule.js";
export const CurrentStock = async (req, res) => {
  try {
    const employees = await CurrentModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};