import axios from "axios";
import React, { useState } from "react";

function BulkDocuments() {
  const [agentName, setAgentName] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [documentSubmit, setDocumentSubmit] = useState("");
  const [svPrepared, setSvPrepared] = useState("");
  const [cylinderIssue, setCylinderIssue] = useState("");
  const [prIssue, setPrIssue] = useState("");
  const [rtIssue, setRtIssue] = useState("");
  const [amountDeposit, setAmountDeposit] = useState("");
  const [svDiscount, setSvDiscount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/addbulkdoc", {
        agentName,
        promotionType,
        documentSubmit,
        svPrepared,
        cylinderIssue,
        prIssue,
        rtIssue,
        amountDeposit,
        svDiscount,
      });

      alert(res.data.message);
    } catch (err) {
      alert("Failed to save agent.", err.message);
    }
    setAgentName("");
    setPromotionType("");
    setDocumentSubmit("");
    setSvPrepared("");
    setCylinderIssue("");
    setPrIssue("");
    setRtIssue("");
    setAmountDeposit("");
    setSvDiscount("");
  }

  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Add Bulk Document</span>

      <div className="mt-3 settion p-3   bg-light rounded-3 border-warning border-3 shadow-sm">
        <span className="fs-5 fw-semibold">Refill</span>
        <form onSubmit={handleSubmit}>
          <div className="box-body row mt-2">
            <div className="form-group col-md-3">
              <label>Agent Name</label>
              <select
                name="agentName"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Agent A">Agent A</option>
                <option value="Agent B">Agent B</option>
              </select>
            </div>

            <div className="form-group col-md-3">
              <label>Promotion Type</label>
              <select
                name="promotionType"
                value={promotionType}
                onChange={(e) => setPromotionType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="New">New</option>
                <option value="Old">Old</option>
              </select>
            </div>

            <div className="form-group col-md-3">
              <label>Document Submit</label>
              <input
                type="text"
                name="documentSubmit"
                value={documentSubmit}
                onChange={(e) => setDocumentSubmit(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>SV Prepared</label>
              <input
                type="number"
                name="svPrepared"
                value={svPrepared}
                onChange={(e) => setSvPrepared(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>Cylinder Issue</label>
              <input
                type="number"
                name="cylinderIssue"
                value={cylinderIssue}
                onChange={(e) => setCylinderIssue(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>PR Issue</label>
              <input
                type="number"
                name="prIssue"
                value={prIssue}
                onChange={(e) => setPrIssue(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>RT Issue</label>
              <input
                type="number"
                name="rtIssue"
                value={rtIssue}
                onChange={(e) => setRtIssue(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>Amount Deposit</label>
              <input
                type="text"
                name="amountDeposit"
                value={amountDeposit}
                onChange={(e) => setAmountDeposit(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>SV Discount (Rs)</label>
              <input
                type="text"
                name="svDiscount"
                value={svDiscount}
                onChange={(e) => setSvDiscount(e.target.value)}
              />
            </div>
          </div>

          <div className="text-end my-3">
            <button className="btn btn-dark btn-sm px-3" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BulkDocuments;
