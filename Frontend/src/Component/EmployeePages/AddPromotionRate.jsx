import axios from "axios";
import React, { useState } from "react";

function AddPromotionRate() {
  const [promotion, setPromotion] = useState("");
  const [rate, setRate] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const news= new Date().toLocaleTimeString();
  const today = new Date().toISOString().split("T")[0];
  const promotion_type = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/addpromotion", {
        itId:1,
        promotion,
        rate,
        qty,
        description,
        times: news,
        update_ty:'A'
      });
      alert(res.data.message);
      setDescription(""),
      setPromotion("")
      setQty("")
      setRate("")
    } catch (err) {
      alert("Failed to save agent.");
    }
  };

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
