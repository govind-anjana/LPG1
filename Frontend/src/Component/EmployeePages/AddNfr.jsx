import React, { useContext, useState } from "react";
import axios from "../AxiosConfig";
import { FaBook } from "react-icons/fa6";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../Context/DataContext";
function AddNfr() {
  const {bool1,setBool1,alertM,setAlertM}=useContext(DataContext)
  const times = new Date().toLocaleTimeString();
  const [itemGroup, setItemGroup] = useState("");
  const [vendorNames, setVendorNames] = useState("");
  const [modelName, setModelName] = useState("");
  const [nfrRate, setNfrRate] = useState("");
  const [nfrRsp, setNfrRsp] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [remarks, setRemarks] = useState("");
  const [vendorName, setVendorName] = useState([]);
  const [itemGroup_list,setItemGroup_List]=useState([])

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/updatenfr/${id}`, {
          itemGroup,
          vendorNames,
          modelName,
          nfrRate,
          nfrRsp,
          openingStock,
          remarks,
          update_ty: "U",
        });
           navigate("/app/nfr");
      } else {
         setBool1(true);
      setAlertM("NFR Rate added successfully")
       await axios.post("/addnfr", {
          itemGroup,
          vendorNames,
          modelName,
          nfrRate,
          nfrRsp,
          openingStock,
          remarks,
          times,
          update_ty: "A",
        });
        
      }
    } catch (err) {
      alert("Failed to save agent.", err.message);
    }
    setItemGroup("");
    setModelName("");
    setNfrRate("");
    setNfrRsp("");
    setOpeningStock("");
    setRemarks("");
    setVendorNames("");  
  };
  useEffect(() => {
    const fetchapi = async () => {
      const res = await axios.get("/consumerlist");
      setVendorName(res.data);
      
      const resitem=await axios.get("/itemgrouplist");
      setItemGroup_List(resitem.data);
    };
    fetchapi();
  }, []);
  useEffect(() => {
    if (id && editData) {
      editData;
      setItemGroup(editData.itemGroup);
      setModelName(editData.modelName);
      setNfrRate(editData.nfrRate);
      setNfrRsp(editData.nfrRsp);
      setOpeningStock(editData.openingStock);
      setRemarks(editData.remarks);
      setVendorNames(editData.vendorNames);
    }
  }, [id, editData]);

  return (
    <div className="addnfr allworking boxdesign">
      <span className="fs-4 fw-semibold"><FaBook/> Add NFR</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-1">NFR</span>
          {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
        <form className="row mt-2" onSubmit={handleSubmit}>
          <div className="col-md-6 mb-3">
            <label className="form-label">Item Group</label>
            <select
              name="itemGroup"
              value={itemGroup}
              onChange={(e) => setItemGroup(e.target.value)}
              required
            >
              <option value="">Select</option>
              {itemGroup_list.map((item, idx) => (
                <option key={idx} value={item.itemGroupName}>
                  {item.itemGroupName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Vendor Name</label>
            <select
              name="vendorName"
              value={vendorNames}
              onChange={(e) => setVendorNames(e.target.value)}
              required
            >
              <option value="">Select</option>
              {vendorName.map((item, idx) => (
                <option key={idx} value={item.deliveryMan}>
                  {item.deliveryMan}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Model Name</label>
            <input
              type="text"
              name="modelName"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">NFR Rate</label>
            <input
              type="number"
              name="nfrRate"
              value={nfrRate}
              onChange={(e) => setNfrRate(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">NFR RSP</label>
            <input
              type="number"
              name="nfrRsp"
              value={nfrRsp}
              onChange={(e) => setNfrRsp(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Opening Stock</label>
            <input
              type="number"
              name="openingStock"
              value={openingStock}
              onChange={(e) => setOpeningStock(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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

export default AddNfr;
