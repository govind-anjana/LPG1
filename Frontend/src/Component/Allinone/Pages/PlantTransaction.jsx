import axios from "../../AxiosConfig";
import React, { useState } from "react";
import { useContext } from "react";
import DataContext from "../../../Context/DataContext";

function PlantTransaction() {
    const {date,bool1,setBool1,alertM,setAlertM } = useContext(DataContext)
    const today = date.toLocaleDateString("en-CA");
  // const dates = new Date().toISOString().split("T")[0];
  const [ReDate, setReDate] = useState(today);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [qty, setQty] = useState("");
  const [emptyQty, setEmptyQty] = useState("");
  const [remarks, setRemarks] = useState("");
  const [invoice, setInvoice] = useState("");

  const Equipment_name = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
     setBool1(true);
      setAlertM("Plant Transaction added successfully")
    await axios
      .post("/planttransaction", {
        ReDate,
        selectedEquipment,
        qty,
        emptyQty,
        remarks,
        invoice,
      })
      .then((res) => {
      })
      .catch((err) => err);

    setEmptyQty(""),
      setInvoice(""),
      setQty(""),
      setReDate(""),
      setRemarks(""),
      setSelectedEquipment("");
  }

  return (
    <div className="transaction  settion p-3 rounded-3  border-warning border-3">
      <span className="fs-5 fw-semibold">Plant Transaction</span>
       {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <div className="box-body row">
          <div className="form-group col-md-4">
            <label htmlFor="receivedDate">Received Date</label>
            <input
              type="date"
              value={ReDate}
              onChange={(e) => setReDate(e.target.value)}
              id="receivedDate"
              name="receivedDate"
              readOnly
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="equipment">Equipment Name</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              id="equipment"
              name="equipment"
            >
              <option value="">Select</option>
              {Equipment_name.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="filledQty">Filled Qty</label>
            <input
              type="text"
              id="filledQty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="emptyQty">Empty Qty</label>
            <input
              type="text"
              id="emptyQty"
              value={emptyQty}
              onChange={(e) => setEmptyQty(e.target.value)}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="remarks">Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              name="remarks"
              id="remarks"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="invoice">Invoice Type</label>
            <select
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              name="invoice"
              id="invoice"
            >
              <option value="">Select</option>
              <option value="One Way">One Way</option>
              <option value="Two Way">Two Way</option>
            </select>
          </div>
        </div>

        <div className="text-end my-3">
          <button type="submit" className="btn btn-dark dnt-sm px-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlantTransaction;
