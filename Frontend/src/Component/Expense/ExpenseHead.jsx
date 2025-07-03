import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ExpenseHead() {
  const [expenseType, setExpenseType] = useState("");
  const [expenseH, setexpenseH] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [ExpenseHead_List, setExpense_List] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:4001/expenseheadlist");
      setExpense_List(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };

  useEffect(() => {
    if (id && editData) {
      setExpenseType(editData.expenseType);
      setexpenseH(editData.expenseH);
      setDescription(editData.description);
    }
    fetchEmployees();
  }, [id, editData]);

  function Edithandle(id, emp) {
    navigate(`/expensehead/${id}`, { state: { empData: emp } });
  }

  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
      try {
        const res = await axios.delete(
          `http://localhost:4001/deleteexpensehead/${id}`
        );
        console.log(res);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      const res = await axios.put(
        `http://localhost:4001/updateexpenses/${id}`,
        {
          expenseType,
          expenseH,
          description,
          update_ty: "U",
        }
      );
      alert("Data Update");
      fetchEmployees();
    } else {
      await axios
        .post("http://localhost:4001/addexpensehead", {
          expenseType,
          expenseH,
          description,
          update_ty: "A",
        })
        .then((res) => {
          alert("Data Submit", res.data.message);
          fetchEmployees();
        })
        .catch((err) => console.log(err));
    }
    setexpenseH(""), setDescription(""), setExpenseType("");
  }

  return (
    <div className="expensehead allworking boxdesign">
      <span className="fs-4 fw-semibold">Expenses</span>
      <div className="d-md-flex mt-3 gap-4 flex-wrap">
        <div className="headdiv settion p-3 bg-light rounded-2  border-warning border-3 shadow-sm">
          <span className="fs-6 fw-semibold">Add Expense Head </span>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="mb-3">
                <label className="form-label">Expense Type</label>
                <select
                  value={expenseType}
                  onChange={(e) => setExpenseType(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="office expenses">Office Expenses</option>
                  <option value="godown expenses">Godown Expenses</option>
                  <option value="salary expenses">Salary Expenses</option>
                  <option value="delivery expenses">Delivery Expenses</option>
                  <option value="other expenses">Other Expenses</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Expense Head</label>
                <br />
                <input
                  type="text"
                  value={expenseH}
                  onChange={(e) => setexpenseH(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
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

        <div className="flex-fill boxdesign allworking p-3 bg-light rounded-2 border-warning border-3 shadow-sm h-auto">
          <span className="fs-6 fw-semibold px-2">Expense Head List</span>
          <br />
          <div className="mt-3 px-2 d-flex justify-content-between align-items-center">
            <input
              className="me-2"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "180px" }}
            />
            <div></div>
          </div>
          <div className="table-responsive px-1 pb-2 ">
            <table className="table table-striped" style={{ fontSize: "13px" }}>
              <thead className="table-secondary">
                <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                  <th>Expense Head</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ExpenseHead_List.length > 0 ? (
                  ExpenseHead_List.map((item, index) => (
                    <tr key={index}>
                      <td>{item.expenseH}</td>
                      <td>
                        <div className="divbtn text-end">
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
                    <td colSpan={4} className="text-center align-middle">
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
    </div>
  );
}

export default ExpenseHead;
