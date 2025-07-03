import axios from "axios";
import moment from "moment-timezone";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
function RateList() {
  const [Rate_list, setRate_list] = useState([]);
  const fetchRateList = async () => {
    try {
      const res = await axios.get("http://localhost:4001/addratelist");
      setRate_list(res.data);
      console.log(res);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchRateList();
  }, []);
  function Edithandle() {
    alert();
  }
  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
    try {
      const res = await axios.delete(`http://localhost:4001/deleterate/${id}`);
      fetchRateList();
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  }
  return (
    <div className="ratelist boxdesign">
      <span className="fs-4 fw-semibold">Rate</span>
      <div className=" settion mt-3 p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Rate List</span>

        <div className="allworking mt-3 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center mb-3 px-2">
          <input
            type="text"
            placeholder="Search...."
            className="search"
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/rate/rate">
              <button className="btn btn-dark btn-sm">
                Add Equipment Rate
              </button>
            </Link>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table table-striped text-capitalize"
            style={{ fontSize: "14px ", borderCollapse: "inherit" }}
          >
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th width="10px">ID</th>
                <th>Equipment Name</th>
                <th>Base Price</th>
                <th>SCPT</th>
                <th>CGST</th>
                <th>Total RSP</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Rate_list.length > 0 ? (
                Rate_list.map((item, index) => (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{item.equipment}</td>
                    <td>{item.basePrice}</td>
                    <td>{item.sgst}</td>
                    <td>{item.cgst}</td>
                    <td>{item.totalRsp}</td>
                    <td>
                      {moment(item.validFrom)
                        .tz("Asia/Kolkata")
                        .format("DD-MM-YYYY")}
                    </td>
                    <td>
                      {moment(item.validTo)
                        .tz("Asia/Kolkata")
                        .format("DD-MM-YYYY")}
                    </td>
                    <td>
                      <div className="divbtn ">
                        <FaEdit className="me-2" onClick={Edithandle} />
                        <FaDeleteLeft onClick={() => Deletehandle(item._id)} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img src="govind" alt="No data" className="my-4" />
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
                <div className="text-muted small">
                  Records: 1 to {Rate_list.length} of {Rate_list.length}
                </div>
        </div>
      </div>
    </div>
  );
}

export default RateList;
