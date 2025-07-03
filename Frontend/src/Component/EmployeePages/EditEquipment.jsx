import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditEquipment() {
  const { id } = useParams();
  const location = useLocation();
  const empData = location.state?.empData;

  const [strock, setStrock] = useState(empData.op_stock);
  const [up, setUp] = useState("U");
  const [gender, setGender] = useState("No"); 
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();  
    axios
      .put(`http://localhost:4001/equipment/${id}`, {
        op_stock: strock,
        update_flag: up, 
      })
      .then((res) =>{ alert("User updated successfully!")
      navigate("/equipment")
      }
  )
      .catch((err) => alert("Error updating user"));
  };

  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Edit Equipment</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-1">Equipment</span>
        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6 mb-3">
            <label className="form-label">Equipment Name</label>
            <input
              type="text"
              name="equipment"
              disabled
              value={empData.eqName}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Equipment Code</label>
            <input
              type="text"
              name="eqCode"
              disabled
              value={empData.eqCode}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Equipment Type</label>
            <select value={empData.conType} disabled  >
              <option value="1">Filled Cylinder</option>
              <option value="2">Empty Cylinder</option>
              <option value="3">Defective Cylinder All Type</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Opening Stock</label>
            <input
              type="number"
              onChange={(e) => setStrock(e.target.value)}
              value={strock}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label mb-2 d-block">Sale</label>
          
              Yes
              <input
                type="radio"
                value="yes"
                name="g"
                checked={gender === "yes"}
                onChange={(e) => setGender(e.target.value)}
              />
            
           
              No
              <input
                type="radio"
                value="No"
                name="g"
                checked={gender === "No"}
                onChange={(e) => setGender(e.target.value)}
              />
           
          </div>

          <div className="text-end mt-3">
            <button type="submit" className="btn btn-dark dtn-sm px-3">
              Save
            </button>
          </div>

          <input type="hidden" value={up} name="update_flag" />
        </form>
      </div>
    </div>
  );
}

export default EditEquipment;
