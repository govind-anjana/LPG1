import axios from "../AxiosConfig";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FaEdit} from "react-icons/fa";
import { FaDeleteLeft,FaBook } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../Context/DataContext";
function Agent() {
  const {bool1,setBool1,alertM,setAlertM}=useContext(DataContext)
  const [agentList, setAgentList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;
  const [formData, setFormData] = useState({
    agentName: "",
    mobile: "",
    address: "",
    promotionName: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/masterlist");
      setAgentList(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  function Edithandle(id, data) {
    navigate(`/app/agent/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`/deleteagent/${id}`);
      res.data;
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  useEffect(() => {
    fetchEmployees();
    setFormData({
      agentName: "",
      mobile: "",
      address: "",
      promotionName: "",
      discount: "",
    });
  }, []);
  const handleSubmit = async (e) => {
    const dataToSend = {
      ...formData,
      update_ty: id ? "U":"A",
    };
    e.preventDefault();
    if (id) {
      try{
      await axios.put(`/masters/${id}`, dataToSend);
      alert("Update Data");
      fetchEmployees();
      }
      catch(err){
        alert(err)
      }
    } else {
      try {
         setBool1(true);
         setAlertM("Agent Rate added successfully")
       await axios.post("/master", dataToSend);
        fetchEmployees();
      } catch (err) {
        alert("Failed to save agent.");
      }
    }
    setFormData({
      agentName: "",
      mobile: "",
      address: "",
      promotionName: "",
      discount: "",
    });
  };
  const promotion_type = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
  ];
  useEffect(() => {
    if (id && editData) {
      setFormData({
        agentName: editData.agentName,
        mobile: editData.mobile,
        address: editData.address,
        promotionName: editData.promotionName,
        discount: editData.discount,
        update_ty: "U",
      });
    }
  }, [id, editData]);
  return (
    <div className="expensehead allworking boxdesign">
      <span className="fs-4 fw-semibold"><FaBook/> Agent</span>
      <div className="d-md-flex mt-1 gap-4 flex-wrap align-items-start">
        <div
          className="headdiv settion p-3 bg-light rounded-2  border-warning border-3 shadow-sm"
        >
        <span className="fs-6 fw-semibold ">Add Agent Model</span>
         {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
          <form onSubmit={handleSubmit}>
            <div className="row agentname">
              <div className="col-sm-6 mb-3">
                <label className="form-label">Agent Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="agentName"
                  value={formData.agentName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label className="form-label">Promotion Name</label>
                <select
                  name="promotionName"
                  value={formData.promotionName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Promotion Type</option>
                  {promotion_type.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-sm-6 mb-3">
                <label className="form-label">Discount (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-end my-3">
              <button type="submit" className="btn btn-dark btn-sm px-3">
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="flex-fill settion allworking p-3 bg-light rounded-2 border-top border-warning border-3 shadow-sm">
         <span className="fs-6 fw-semibold ">Agent Model List</span>
          <br />
          <div className="mt-3 d-flex justify-content-between">
            <input
              type="text"
              placeholder="Search..."
              style={{ maxWidth: "180px" }}
            />
            <div></div>
          </div>

          <div className="table-responsive py-2 pb-2">
            <table
              className="table table-striped text-capitalize"
              style={{ fontSize: "14px" }}
            >
              <thead className="table-secondary">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Discount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {agentList.length > 0 ? (
                  agentList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.agentName}</td>
                      <td>{item.mobile}</td>
                      <td>{item.address}</td>
                      <td>{item.discount}</td>
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
                    <td colSpan={5} className="text-center align-middle">
                      <div className="text-center py-3">
                        <span className="text-warning">
                          No data available in table
                        </span>
                        <br />
                        <img
                          src="http:/placeholde"
                          alt="No data"
                          className="my-4"
                        />
                        <br />
                        <span className="text-success">
                          Add new record or search with different criteria.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={5}>
                    <span className=" text-muted small">{`Records : 1 to ${agentList.length} to  ${agentList.length}`}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
