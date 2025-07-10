import axios from "../AxiosConfig";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function BulkDocuments() {
  const times = new Date().toLocaleTimeString();
  const [agentName, setAgentName] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [documentSubmit, setDocumentSubmit] = useState("");
  const [svPrepared, setSvPrepared] = useState("");
  const [cylinderIssue, setCylinderIssue] = useState("");
  const [prIssue, setPrIssue] = useState("");
  const [rtIssue, setRtIssue] = useState("");
  const [amountDeposit, setAmountDeposit] = useState("");
  const [svDiscount, setSvDiscount] = useState("");
  const [agentList, setAgentList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.empData;

  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      try {
        const res = await axios.put(`/updatebulk/${id}`, {
          agentName,
          promotionType,
          documentSubmit,
          svPrepared,
          cylinderIssue,
          prIssue,
          rtIssue,
          amountDeposit,
          svDiscount,
          update_ty: "U",
        });
        alert("Update Data");
        navigate("/app/bulkDocumentList");
      } catch (err) {
        alert("Failed to save agent.", err.message);
      }
    } else {
      try {
        const res = await axios.post("/addbulkdoc", {
          agentName,
          promotionType,
          documentSubmit,
          svPrepared,
          cylinderIssue,
          prIssue,
          rtIssue,
          amountDeposit,
          svDiscount,
          update_ty: "A",
          times,
        });
        navigate("/app/bulkDocumentList");
      } catch (err) {
        alert("Failed to save agent.", err.message);
      }
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
  const PromotionList = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
  ];
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/masterlist");
        setAgentList(res.data);
       
      } catch (err) {
        console.error(" Error fetching employee list:", err.message);
      }
    };
    fetchEmployees();
  }, []);
  useEffect(() => {
    if (id && editData) {
      setAgentName(editData.agentName);
      setPromotionType(editData.promotionType);
      setDocumentSubmit(editData.documentSubmit);
      setSvPrepared(editData.svPrepared);
      setCylinderIssue(editData.cylinderIssue);
      setPrIssue(editData.prIssue);
      setRtIssue(editData.rtIssue);
      setAmountDeposit(editData.amountDeposit);
      setSvDiscount(editData.svDiscount);
    }
  }, [id, editData]);
  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Add Bulk Document</span>

      <div className="mt-3 settion p-3   bg-light rounded-3 border-warning border-3 shadow-sm">
        <span className="fs-5 fw-semibold">
          {id ? "Edit Bulk Document" : "Add Bulk Document"}
        </span>
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
                {agentList.map((item, index) => (
                  <option key={index} value={item.agentName}>
                    {item.agentName}
                  </option>
                ))}
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
                {PromotionList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
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
