import UserModel from "../module/AdminUserModule.js";
export const Useradmin = async (req, res) => {
  try {
    const employees = await UserModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

export const UpdateUser = async (req, res) => {
  const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};
