import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
function DocumentList() {
  const [document_List, setDocument_list] = useState([]);
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:4001/documentlist");
      setDocument_list(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  function Edithandle() {
    alert();
  }

  async function Deletehandle(id) {
    const valid = confirm("Delete Delivery");
    if (valid) {
      try {
        const res = await axios.delete(
          `http://localhost:4001/deletedocument/${id}`
        );
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="allworking  boxdesign">
      <span className="fs-4 fw-semibold">Document</span>
      <div className="mt-3 settion p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Document List</span>
        <div className="mt-2 px-2  d-flex flex-wrap justify-content-md-between justify-content-center align-items-center mb-2">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/document/document">
              <button className="btn btn-dark btn-sm px-3 m-2">
                Add Document
              </button>
            </Link>
          </div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top",textAlign:'center'  }}>
                <th>Date</th>
                <th>Connection Type</th>
                <th>Doc Type</th>
                <th>Delivery Man Name</th>
                <th>Consumer Name</th>
                <th>Document Charges</th>
                <th>Cylinder QTY</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {document_List.length > 0 ? (
                document_List.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date?.split("T")[0]}</td>
                    <td>{item.connection}</td>
                    <td>{item.itemType}</td>
                    <td>{item.deliveryMan}</td>
                    <td>{item.consumerName}</td>
                    <td>{item.docCharges}</td>
                    <td>{item.cylQty}</td>
                    <td>yes</td>
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
                  <td colSpan={10} className="text-center align-middle">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DocumentList;
