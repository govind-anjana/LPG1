import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    userType: String,
    name: String,
    mobile: Number,
    salaryType: String,
    salaryAmount: Number,
    address: String,
    address2: String,
    address3: String,
    city: String,
    district: String,
    state: String,
    aadhar: Number,
    licence: String,
    vchNo: String,
    advance: String,
    deposit: Number,
    discount: Number,
    date: String,
  },
  {
    collection: "addemployees",
    timestamps: true,
  }
);

const AddEmployee = mongoose.model("AddEmployee", EmployeeSchema);

export default AddEmployee;
