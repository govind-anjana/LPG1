import axios from "../../AxiosConfig";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import DataContext from "../../../Context/DataContext";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function PlantTransaction() {
  const { date, bool1, setBool1, alertM, setAlertM } = useContext(DataContext);
  const today = date.toLocaleDateString("en-CA");
  // const dates = new Date().toISOString().split("T")[0];
  const [ReDate, setReDate] = useState(today);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [qty, setQty] = useState("");
  const [emptyQty, setEmptyQty] = useState("");
  const [remarks, setRemarks] = useState("");
  const [invoice, setInvoice] = useState("");
  const [plantTransaction_list, setPlantTransaction_list] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;

  const Equipment_name = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];
  const fetchApi = async () => {
    try {
      const res = await axios.get("/plantlist");
      setPlantTransaction_list(res.data);
      
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
      if (id && editData) {
        
       setEmptyQty(editData.emptyQty),
      setInvoice(editData.invoice),
      setQty(editData.qty),
      setReDate(editData.ReDate),
      setRemarks(editData.remarks),
      setSelectedEquipment(editData.selectedEquipment);
      }
      fetchApi();
    }, [id, editData]);
  useEffect(() => {
    fetchApi();
    
  }, []);
  async function handleSubmit(e) {
    setBtnDisabled(true);
    e.preventDefault();
    const btn=document.querySelectorAll('.btn')[1];
    if (btn) {
    setTimeout(() => {
     setBtnDisabled(false) 
    }, 5000);
  }
      try{
     if (id) {
      const res = await axios.put(`/updatePlant/${id}`, {
         ReDate,
        selectedEquipment,
        qty,
        emptyQty,
        remarks,
        invoice,
        update_ty: "U",
      });
      alert("Data Update");
      fetchApi();
    } else {
    setBool1(true);
    setAlertM("Plant Transaction added successfully");
    await axios
      .post("/planttransaction", {
        ReDate,
        selectedEquipment,
        qty,
        emptyQty,
        remarks,
        invoice,
        update_ty:"A"
      })
      .then((res) => {fetchApi()})
      .catch((err) => err);
    }
  } catch(err){
 console.error("Error submitting form:", err);
  }
      setEmptyQty(""),
      setInvoice(""),
      setQty(""),
      setReDate(today),
      setRemarks(""),
      setSelectedEquipment("");
  }

  function Edithandle(id, data) {
    navigate(`/app/plant-transaction/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
      try {
        const res = await axios.delete(`/plantdelete/${id}`);
        fetchApi();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <>
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
                required
              >
                <option value="">Select</option>
                <option value="One Way">One Way</option>
                <option value="Two Way">Two Way</option>
              </select>
            </div>
          </div>

          <div className="text-end my-3">
            <button type="submit" disabled={btnDisabled} className="btn btn-dark btn-sm px-3">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="transaction  settion p-3 rounded-3  border-warning border-3">
        <span className="fs-5 fw-semibold">Plant Transaction List</span>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Received Date </th>
                <th>Equipment Name </th>
                <th>Qty </th>
                <th>Invoice Type </th>
                <th>Remarks </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {plantTransaction_list.length > 0 ? (
                plantTransaction_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ReDate}</td>
                    <td>{item.selectedEquipment}</td>
                    <td>{item.qty}</td>
                    <td>{item.invoice}</td>
                    <td>{item.remarks}</td>
                    <td>
                      <div className="divbtn">
                        {item.update_ty == "A" ? (
                          <span>
                            <FaEdit
                              onClick={() => Edithandle(item._id, item)}
                              title="Edit"
                            />
                            <FaDeleteLeft
                              onClick={() => Deletehandle(item._id)}
                              title="Delete"
                              className="ms-3"
                            />
                          </span>
                        ) : (
                          <span
                            style={{ cursor: "not-allowed", color: "silver" }}
                          >
                            <FaEdit />
                            <FaDeleteLeft className="ms-3" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img src="govind.jpg" alt="No data" className="my-4" />
                      <br />
                      <span className="text-success">
                        Add new record or search with different criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={8}>
                  <span className=" text-muted small">{`Records : 1 to ${plantTransaction_list.length} to  ${plantTransaction_list.length}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PlantTransaction;
