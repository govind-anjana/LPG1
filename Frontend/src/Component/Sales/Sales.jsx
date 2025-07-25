import axios from "../AxiosConfig";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FaIdCard } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../Context/DataContext";

function Sales() {
  const { bool1, setBool1, alertM, setAlertM, nfr_list } =
    useContext(DataContext);
  const [conType, setConType] = useState("");
  const [rate, setRate] = useState(0);
  const [qty, setQty] = useState("");
  const [total,setTotal]=useState(0)
  const [payment, setPayment] = useState("");
  const [model, setModel] = useState("");
  const [remarks, setRemarks] = useState("");
  const [nfrModel, setNfrModel] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;

  const equipment = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];
  useEffect(()=>{
          setNfrModel(nfr_list)
  },[conType])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
       await axios.put(`/updatesale/${id}`, {
        conType,
        model,
        rate,
        qty,
        payment,
        remarks,
        update_ty: "U",
      });

      navigate("/app/sales");
    } else {
      setBool1(true);
      setAlertM("Sales added successfully");
      try {
        const res = await axios.post("/addsale", {
          conType,
          model,
          rate,
          qty,
          payment,
          remarks,
          update_ty: "A",
        });
      } catch (err) {
        alert("Failed to save agent.", err.message);
      }
    }
    setConType(""),
      setModel(""),
      setPayment(""),
      setQty(""),
      setRate(""),
      setRemarks("");
  };
  useEffect(()=>{
        const result=rate*qty;
        setTotal(result)
  },[qty,rate])
  useEffect(() => {
    if (id && editData) {
      
      setConType(editData.conType),
        setModel(editData.model),
        setPayment(editData.payment),
        setQty(editData.qty),
        setRate(editData.rate),
        setRemarks(editData.remarks);
        setTotal((editData.qty)*(editData.rate))
    }
  }, [id, editData]);
  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">
        <FaIdCard /> Sales
      </span>
      <div className="settion mt-2 p-3  bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold">Sales</span>
        {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="box-body row mt-2">
            <div className="form-group col-md-6">
              <label htmlFor="conType">Sales Type</label>
              <select
                required
                id="conType"
                name="conType"
                value={conType}
                onChange={(e) => {
                  setConType(e.target.value);
                  setModel("");
                }}
              >
                <option value="">Select</option>
                <option value="nfr Model">NFR</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>

            {conType && (
              <>
                <div className="form-group col-md-6">
                  <label htmlFor="model">{conType}  Name</label>
                  <select
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="">Select</option>
                    {(conType === "nfr Model"
                      ? nfrModel.map((item) => item.modelName)
                      : equipment
                    ).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-4">
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
                <div className="form-group col-md-4">
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
                 <div className="form-group col-md-4">
                  <label htmlFor="total">Total</label>
                  <br />
                  <input
                    type="number"
                    id="total"
                    value={total}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="paymentType">Payment Type</label>
                  <select
                    id="paymentType"
                    name="paymentType"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                  >
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
                  <input
                    type="text"
                    onChange={(e) => setRemarks(e.target.value)}
                    name="remarks"
                  />
                </div>
              </>
            )}
          </div>
          <div className="text-end my-2">
            <button type="submit" className="btn btn-dark btn-sm px-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sales;
