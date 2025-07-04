import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function DepositCyllist() {
  const [Deposit_List, setDeposit_List] = useState([]);

   const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/depositlist");
      setDeposit_List(res.data);
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
          `http://localhost:4001/deletedeposit/${id}`
        );
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Deposit Cyl</span>

      <div className="settion mt-3 p-3 bg-light rounded-2 border-warning border-3 shadow-sm">
        <span className="fs-5 fw-semibold">Deposit Cyl List</span>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <input
            className="me-2"
            type="text"
            placeholder="Search..."
           
            
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/depositCyl">
              <button className="btn btn-dark btn-sm px-3 m-2">
                Add Deposit Cyl
              </button>
            </Link>
          </div>
        </div>

        <div className="table-responsive  pb-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>User Type</th>
                <th>Employee Name</th>
                <th>Equipment Type</th>
                <th>Equipment Name</th>
                <th>Deposit Cyl</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Deposit_List.length > 0 ? (
                Deposit_List.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userType} </td>
                    <td> {item.employeeName}</td>
                    <td>{item.equipmentType} </td>
                    <td> {item.equipment}</td>
                    <td> {item.depositCyl}</td>
                    <td>
                      <div className="divbtn fs-5 ">
                        <FaEdit className="me-2" onClick={Edithandle} />
                        <FaDeleteLeft onClick={() => Deletehandle(item._id)} />
                      </div>{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center align-middle">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DepositCyllist;
