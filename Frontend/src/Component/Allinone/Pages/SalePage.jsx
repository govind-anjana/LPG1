import axios from "axios";
import React, { useContext, useState } from "react";
import DataContext from "../../../Context/DataContext";

function SalePage() {
   const { bool1,setBool1,alertM,setAlertM } = useContext(DataContext);
  const [conType, setConType] = useState("");
  const [rate, setRate] = useState("");
  const [qty,setQty]=useState("");
  const [payment,setPayment]=useState("")
  const [model, setModel] = useState("");
  const [remarks,setRemarks]=useState("")
    
  const model_name = {
    nfr: ["14.2 KG Filled Cyl Domestic", "5 KG Filled Cyl Domestic"],
    equipment: [
      "14.2 KG Filled Cyl Domestic",
      "5 KG Filled Cyl Domestic",
      "19 KG Filled Cyl CM",
      "5 KG Filled Cyl CM FTL POS",
      "10 KG Filled Cyl Composite",
      "45 KG Filled Cyl",
      "LPG Pressure Regulator Sound",
    ],
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
     setBool1(true);
      setAlertM("Sale added successfully")
     try {
     await axios.post("/api/addsale", {
        conType,
        model,
        rate,
        qty,
        payment,
        remarks,
      });

     
    } catch (err) {
      alert("Failed to save agent.", err.message);
    }
     setConType(""),setModel(""),setPayment(""),setQty(""),setRate(""),setRemarks("")
  };

  return (
    <div className="sales settion p-3 rounded-3  border-warning border-3">
      <span className="fs-5 fw-semibold">Equipment</span>
        {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <div className="box-body row">
          <div className="form-group col-md-6">
            <label htmlFor="conType">Sales Type</label>
            <select
              required
              id="conType"
              name="conType"
              onChange={(e) => {
                setConType(e.target.value);
                setModel("");
              }}
            >
              <option value="">Select</option>
              <option value="nfr">NFR</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          {conType && (
            <>
              <div className="form-group col-md-6">
                <label htmlFor="model">{conType} Model Name</label>
                <select
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="">Select</option>
                  {model_name[conType].map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="rate">Rate</label>
                <br />
                <input
                  type="number"
                  id="rate"
                  step={0.01}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="qty">Qty</label>
                <br />
                <input
                  type="number"
                  id="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>
               <div className="form-group col-md-6">
            <label htmlFor="paymentType">Payment Type</label>
            <select id="paymentType" name="paymentType" onChange={e=>setPayment(e.target.value)} >
              <option value="">Select</option>
              <option value="Online">Online</option>
              <option value="PatTm">PayTM</option>
              <option value="Google pay">Google Pay</option>
              <option value="Bhimupi">Bhim UPI</option>
              <option value="Cash">Cash</option>
              <option value="Other">Others</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="remarks">Remarks</label>
            <input type="text" onChange={e=>setRemarks(e.target.value)}  name="remarks"  />
          </div>
            </>
          )}
        </div>
        <div className="text-end my-3">
          <button type="submit" className="btn btn-dark btn-sm px-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SalePage;
