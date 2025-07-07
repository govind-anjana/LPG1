import axios from "../AxiosConfig";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function BulkDocumentList() {
  const [bulkDocumentList, setBulkDocumentList] = useState([]);
  const navigate = useNavigate();
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/bulkdoclist");
      setBulkDocumentList(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  function Edithandle(id, data) {
    navigate(`/bulkDocument/${id}`, { state: { empData: data } });
  }

  async function Deletehandle(id) {
    const valid = confirm("Delete Record");
    if (valid) {
      try {
        const res = await axios.delete(`/deletebulkdoc/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="allworking boxdesign">
      <span className="fs-5 fw-semibold">Bulk Document</span>
      <div className="settion mt-3 p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Bulk Document List</span>

        <div className="my-2 px-2 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center ">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/bulkDocument">
              <button className="btn btn-dark btn-sm px-3 m-2">
                Add Bulk Document
              </button>
            </Link>
          </div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table
            className="table table-striped text-capitalize"
            style={{ fontSize: "14px " }}
          >
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Agent Name</th>
                <th>Promotion Type</th>
                <th>Document Submit</th>
                <th>SV Prepared</th>
                <th>Cylinder Issue</th>
                <th>PR Issue</th>
                <th>RT Issue</th>
                <th>Amount Deposit</th>
                <th>SV Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bulkDocumentList.length > 0 ? (
                bulkDocumentList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.agentName}</td>
                    <td>{item.promotionType}</td>
                    <td>{item.documentSubmit}</td>
                    <td>{item.svPrepared}</td>
                    <td>{item.cylinderIssue}</td>
                    <td>{item.prIssue}</td>
                    <td>{item.rtIssue}</td>
                    <td>{item.amountDeposit}</td>
                    <td>{item.svDiscount}</td>
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
                  <td colSpan="10" className="text-center">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img src="xyz.jpg" alt="No data" className="my-4" />
                      <br />
                      <span className="text-success">
                        Add new record or search with different criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={10}>
                  <span className=" text-muted small">{`Records : 1 to ${bulkDocumentList.length} to  ${bulkDocumentList.length}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BulkDocumentList;
