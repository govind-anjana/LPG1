import AddEmployee from "../module/UserModule.js";
export const AddEmployees = async (req, res) => {
  const data = req.body;
  try {
    const newadd = new AddEmployee(data);
    const saveUser = await newadd.save();
    saveUser;
    res.status(201).json({ message: "Employee added", data: saveUser });
  } catch (err) {
    console.error(" Save error:", err.message);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
};
export const employeeList = async (req, res) => {
  try {
    const employees = await AddEmployee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};
export const deleteemployee = async (req, res) => {
  try {
    const result = await AddEmployee.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedList = await AddEmployee.find();
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const employeeId = async (req, res) => {
  const emp = await AddEmployee.findById(req.params.id);
  res.json(emp);
};
export const employeeUpdate = async (req, res) => {
  const updated = await AddEmployee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};
