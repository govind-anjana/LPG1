import AgentModel from "../module/MasterModule.js";
export const AgentEmployee = async (req, res) => {
  try {
    const data = req.body;
    const newAgent = new AgentModel(data);
    const saveUser= await newAgent.save();
    console.log(saveUser);
    res.status(201).json({ message: "Agent Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const AgentEmployeeList = async (req, res) => {
  try {
    const employees = await AgentModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const result = await AgentModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AgentModel.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
