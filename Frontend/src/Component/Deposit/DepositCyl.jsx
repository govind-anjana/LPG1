import axios from "axios";
import React, { useState } from "react";

function ExpenseHead() {
  const [userType, setUserType] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [equipment, setEquipment] = useState("");
  const [depositCyl, setDepositCyl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [search, setSearch] = useState("");

  const delivery_Man_Name = [
    "Mahendra Singh",
    "Shubham Mali",
    "Dinesh Malviya",
    "Ranchod",
    "Ishwar",
    "Raghu",
    "Kamal",
    "Vijay",
    "Luckky Rathore",
    "Dashrath",
    "Sangram Singh",
    "Sajay Yadav",
    "Krishna",
    "Paven",
    "Manohar",
    "Rajesh Mama",
    "Bhaiyaa",
    "Rameshwar",
  ];

  const equipmentOptions = [
    "14.2 KG Filled Cylinder",
    "5 KG Empty Cylinder",
    "19 KG Commercial Cylinder",
    "Regulator",
    "Other Equipment",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/adddeposit", {
        userType,
        equipmentType,
        employeeName,
        equipment,
        depositCyl,
        remarks,
      });

      alert(res.data.message);
    } catch (err) {
      alert("Failed to save agent.", err.message);
    }
  }
  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Deposit Cyl</span>
     
        <div className="settion mt-3 p-3 bg-light rounded-2 border-warning border-3 shadow-sm">
          <span className="fs-5  fw-semibold">Add Deposit Cyl</span>
          <form onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="col-md-4">
                <label className="form-label">User Type</label>
                <select
                  name="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="delivery Man">Delivery Man</option>
                  <option value="staff">Staff</option>
                  <option value="vendor">Vendor</option>
                  <option value="consumer">Consumer</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Employee Name</label>
                <select
                  name="employeeName"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {delivery_Man_Name.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Equipment Type</label>
                <br />
                Filled
                <input
                  type="radio"
                  name="equipmentType"
                  value="Filled"
                  onChange={(e) => setEquipmentType(e.target.value)}
                />
                &nbsp; Empty
                <input
                  type="radio"
                  name="equipmentType"
                  value="Empty"
                  onChange={(e) => setEquipmentType(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label>Equipment List</label>
                <select
                  name="equipment"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {equipmentOptions.map((eq, idx) => (
                    <option key={idx} value={eq}>
                      {eq}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Deposit Cylinder</label>
                <input
                  type="number"
                  name="depositCyl"
                  value={depositCyl}
                  onChange={(e) => setDepositCyl(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>

            <div className="text-end my-3">
              <button type="submit" className="btn btn-dark btn-sm px-3">
                Save
              </button>
            </div>
          </form>
        </div>
      
    </div>
  
  );
}

export default ExpenseHead;
