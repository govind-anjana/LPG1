import axios from "../AxiosConfig";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddPromotionRate() {
  const [promotion, setPromotion] = useState("");
  const [rate, setRate] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const times= new Date().toLocaleTimeString();
  const navigate=useNavigate()
  const {id}=useParams()
  const location=useLocation()

  const editData=location.state?.empData;
  const promotion_type = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id){
          const res=await axios.put(`/promtionupdate/${id}`,{
          promotion,
          rate,
          qty,
          description,
          update_ty:'U'
          })
          alert("update Data")
          navigate("/promation")
    }
    else {

      try {
        const res = await axios.post("/addpromotion", {
          promotion,
          rate,
          qty,
          description,
          times,
          update_ty:'A'
        });
        alert(res.data.message);
      } catch (err) {
        alert("Failed to save agent.");
      }
    }
    setDescription(""),
    setPromotion("")
    setQty("")
    setRate("")
  };
  useEffect(()=>{
    if(id && editData){
      setDescription(editData.description)
      setPromotion(editData.promotion)
      setQty(editData.qty)
      setRate(editData.rate)
    }
  },[id,editData])

  return (
    <div className="addpromotion allworking boxdesign">
      <span className="fs-4 fw-semibold">Add Promotion Rate</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-1">Equipment</span>
        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6 mb-3">
            <label className="form-label">Promotion Type</label>
            <select
              name="promotion"
              value={promotion}
              onChange={(e) => setPromotion(e.target.value)}
            >
              <option value="">Select Promotion Type</option>
              {promotion_type.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Promotion Rate</label>
            <input
              type="number"
              name="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Cylinder Qty</label>
            <input
              type="text"
              name="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="text-end mt-2">
            <button type="submit" className="btn btn-dark btn-sm px-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPromotionRate;
