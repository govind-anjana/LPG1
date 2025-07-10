import axios from "../AxiosConfig";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddPenalty() {
  const times = new Date().toLocaleTimeString();
  const [employeeName, setEmployeeName] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;
  const [penaltyList, setPenaltyList] = useState([]);

  const delivery_Man_Name = [
    "Mahendra Singh",
    "Shubham Mali",
    "Dinesh Malviya",
    "Ranchod",
    "Ishwar",
    "Raghu",
    "Kamal",
    "Vijay",
    "Luckky Rathore",
    "Dashrath",
    "Sangram Singh",
    "Sajay Yadav",
    "Krishna",
    "Paven",
    "Manohar",
    "Rajesh Mama",
    "Bhaiyaa",
    "Rameshwar",
  ];
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/penaltylist");
      setPenaltyList(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    if (id && editData) {
      console.log(editData);
      setAmount(editData.amount);
      setEmployeeName(editData.employeeName);
      setRemarks(editData.remarks);
    }
  }, [id, editData]);
  useEffect(() => {
    fetchEmployees();
  }, []);

  function Edithandle(id, data) {
    navigate(`/app/panalty/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
      try {
        const res = await axios.delete(`/deletepenalty/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      await axios.put(`/updatepenalty/${id}`, {
        employeeName,
        amount,
        remarks,
        update_ty: "U",
      });
      alert("Update Data");
      fetchEmployees();
    } else {
      await axios
        .post("/addpenalty", {
          employeeName,
          amount,
          remarks,
          times,
          update_ty: "A",
        })
        .then((res) => {
          alert("Data Submit", res.data.message);
          fetchEmployees();
        })

        .catch((err) => err);
    }
    setAmount(""), setEmployeeName(""), setRemarks("");
  }
  return (
    <div className="expensehead allworking boxdesign">
      <span className="fs-4 fw-semibold">Penalty</span>
       <div className="d-md-flex mt-1 gap-4 flex-wrap">
      <div className="headdiv settion p-3 bg-light rounded-2  border-warning border-3 shadow-sm">
        <span className="fs-5 fw-semibold">Add Penalty</span>
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            <div className="mb-2">
              <label>Employee Name</label>
              <select
                name="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                <option value="">Select</option>
                {delivery_Man_Name.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Remarks</label>
              <input
                type="text"
                name="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
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

      <div className="settion flex-fill p-3 bg-light rounded-2  border-warning border-3 shadow-sm">
        <span className="fs-5 fw-semibold">Penalty List</span>
        <div className="mt-3 d-flex justify-content-between align-items-center">
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

        <div className="table-responsive my-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Create At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {penaltyList.length > 0 ? (
                penaltyList
                  .filter((item) =>
                    item.employeeName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.employeeName}</td>
                      <td>{item.amount}</td>
                      <td>{item.createdAt.split("T")[0]}</td>
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
                  <td colSpan={4} className="text-center align-middle">
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
                <td colSpan={4}>
                  <span className=" text-muted small">{`Records : 1 to ${penaltyList.length} to  ${penaltyList.length}`}</span>
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

export default AddPenalty;
