import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function SalesList() {
  const [Sales_List, setSales_list] = useState([]);
  const navigate=useNavigate()
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/salelist");
      setSales_list(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  function Edithandle(id,data) {
      navigate(`/sales/sales/${id}`,{state:{empData:data}})
  }

  async function Deletehandle(id) {
    const valid = confirm("Delete Delivery");
    if (valid) {
      try {
        const res = await axios.delete(`/api/deletesale/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="allworking  boxdesign">
      <span className="fs-4 fw-semibold">Sales</span>
      <div className="mt-3 settion p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Sales List</span>
        <div className="my-2 px-2 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center ">
          <input
            type="text"
            placeholder="Search...."
            className="search"
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/sales/sales">
              <button className="btn btn-dark btn-sm px-3 m-2">Add sale</button>
            </Link>
          </div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Sr No.</th>
                <th>Sales Type</th>
                <th>NFR Name</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Payment Type</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Sales_List.length > 0 ? (
                Sales_List.map((item, index) => (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{item.conType}</td>
                    <td>{item.model}</td>
                    <td>{item.rate}</td>
                    <td>{item.qty}</td>
                    <td>{item.payment}</td>
                    <td>{item.date?.split("T")[0]}</td>
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
                  <td colSpan={8} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img
                        src="https://placeholder.com"
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
                <td colSpan={8}>
                  <span className=" text-muted small">{`Records : 1 to ${Sales_List.length} to  ${Sales_List.length}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesList;
