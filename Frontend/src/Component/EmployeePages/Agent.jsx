import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function Agent() {
  const [agentList, setAgentList] = useState([]);

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
      const res = await axios.get("http://localhost:4001/masterlist");
      setAgentList(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  function Edithandle() {
    alert();
  }
  async function Deletehandle(id) {
    try {
      const res = await axios.delete(
        `http://localhost:4001/deleteagent/${id}`
      );
      console.log(res.data)
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/master", formData);
      alert(res.data.message);
      fetchEmployees();
      setFormData({
        agentName: "",
        mobile: "",
        address: "",
        promotionName: "",
        discount: "",
      });
    } catch (err) {
      alert("Failed to save agent.");
    }
  };
  const promotion_type = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
  ];

  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Add Agent</span>
      <div className="d-flex mt-3 gap-3 flex-wrap">
        <div
          className="flex-fill settion p-3 bg-light rounded-2 border-top border-warning border-3 shadow-sm"
          style={{ width: "250px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row agentname">
              <div className="col-6 mb-3">
                <label className="form-label">Agent Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="agentName"
                  value={formData.agentName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">Promotion Name</label>
                <select
                  
                  name="promotionName"
                  value={formData.promotionName}
                  onChange={handleChange}
                >
                 <option value="">Select Promotion Type</option>
                 {promotion_type.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
                </select>
              </div>

              <div className="col-6 mb-3">
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

        <div className="flex-fill settion allworking p-2 bg-light rounded-2 border-top border-warning border-3 shadow-sm">
          <span className="fs-5">Agent List</span>
          <br />
          <div className="mt-3 d-flex justify-content-between">
            <input
              type="text"
              placeholder="Search..."
              style={{ maxWidth: "180px" }}
            />
            <div>{agentList.length}</div>
          </div>

          <div className="table-responsive">
            <table
              className="table table-striped my-3"
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
                        <div className="divbtn fs-5 ">
                          <FaEdit className="me-2" onClick={Edithandle} />
                          <FaDeleteLeft onClick={() => Deletehandle(item._id)} />
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
