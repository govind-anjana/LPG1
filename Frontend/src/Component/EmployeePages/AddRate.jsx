import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function AddRate() {
  const today = new Date();
  const times = today.toLocaleTimeString();
  const news = today.toISOString().split("T")[0];
  const [equipment, setEquipment] = useState("");
  const [totalRsp, setTotalRsp] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [validFrom, setValidFrom] = useState(news);
  const [validTo, setValidTo] = useState(news);

  const Equipment_name = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45.5 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];

  function quipmentHandle(e) {
    const selected = e.target.value;
    setEquipment(selected);
    if (
      selected === "14.2 KG Filled Cyl Domestic" ||
      selected === "5 KG Filled Cyl Domestic" ||
      selected === "10 KG Filled Cyl Composite"
    ) {
      setSgst(2.5);
      setCgst(2.5);
    } else if (
      selected == "19 KG Filled Cyl CM" ||
      selected == "19 KG Filled Cyl CM" ||
      selected == "5 KG Filled Cyl CM FTL POS" ||
      selected == "45.5 KG Filled Cyl"
    ) {
      setSgst(9);
      setCgst(9);
    } else {
      setSgst(0);
      setCgst(0);
    }
  }
  useEffect(() => {
    if (totalRsp > 0) {
      const gst = sgst + cgst;
      const gstAmount = (totalRsp * gst) / (100 + gst);
      const base = (totalRsp - gstAmount).toFixed(2);
      setBasePrice(base);
    }
  }, [sgst, cgst, totalRsp]);

  function handleTotal(e) {
    const values = e.target.value;
    setTotalRsp(values);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/addrate", {
        equipment,
        totalRsp,
        sgst,
        cgst,
        basePrice,
        validFrom,
        validTo,
        dates: times,
      });
      console.log(res);
    } catch (err) {
      alert("Failed to save agent.");
    }
    setBasePrice(0),
      setCgst(0),
      setEquipment(""),
      setTotalRsp(0),
      setValidFrom(news);
    setValidTo(news), setSgst(0);
  };
  return (
    <div className="addpromotion allworking boxdesign">
      <span className="fs-4 fw-semibold">Add Rate</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-1">Equipment</span>
        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6 mb-3">
            <label className="form-label">Equipment Name</label>
            <select
              name="equipment"
              value={equipment}
              onChange={quipmentHandle}
              required
            >
              <option value="">Select Equipment</option>
              {Equipment_name.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Total RSP</label>
            <input
              type="number"
              name="totalRsp"
              value={totalRsp}
              onChange={handleTotal}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">SGST</label>
            <input
              type="number"
              name="sgst"
              className="form-control"
              value={sgst}
              disabled
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">CGST</label>
            <input
              type="number"
              name="cgst"
              className="form-control"
              value={cgst}
              onChange={(e) => setCgst(e.target.value)}
              disabled
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Base Price</label>
            <input
              type="number"
              name="basePrice"
              className="form-control"
              value={totalRsp == 0 ? 0 : basePrice}
              disabled
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Valid From</label>
            <input
              type="date"
              name="validFrom"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Valid To</label>
            <input
              type="date"
              name="validTo"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
            />
          </div>

          <div className="text-end mt-3">
            <button type="submit" className="btn btn-dark">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRate;
