import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
function ExpenseList() {
  const [Expense_List, setExpense_list] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/expenselist");
      setExpense_list(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
function Edithandle(id, emp) {
    navigate(`/expense/expense/${id}`, { state: { empData: emp } });
  }
  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
      try {
        const res = await axios.delete(
          `/api/deleteexpense/${id}`
        );
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className=" allworking boxdesign">
      <span className="fs-4 fw-semibold">Expenses</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Expense List</span>
        <div className="my-2 px-2 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center ">
          <input
            type="text"
            placeholder="Search...."
            className="search"
            style={{ maxWidth: "180px" }}
          />
          <div>
            {" "}
            <Link to="/expenses/espenses">
              <button className="btn btn-dark btn-sm px-3 m-2">
                Add Expense
              </button>
            </Link>
          </div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>User Type</th>
                <th>Name</th>
                <th>Expense Head</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Expense_List.length > 0 ? (
                Expense_List.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userType}</td>
                    <td>{item.names}</td>
                    <td>{item.expenseHead}</td>
                    <td>{item.amount}</td>
                    <td>{item.date?.split("T")[0]}</td>
                    <td>
                      <div className="divbtn text-center">
                        <FaEdit
                          className="me-2"
                          onClick={() => Edithandle(item._id, item)}
                        />
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

export default ExpenseList;
