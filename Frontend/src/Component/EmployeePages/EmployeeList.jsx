import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function EmployeeList() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/api/employeeList");
        setEmployees(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(" Error fetching employee list:", err.message);
      }
    };

    fetchEmployees();
  }, []);
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updated = [...employees];
      updated.splice(index, 1);
      setEmployees(updated);
    }
  };
  function Edithandle(id) {
    navigate("/employee", { state: { id: id } });
  }
  async function Deletehandle(id) {
    try {
      const res = await axios.delete(`/api/deleteemployee/${id}`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  return (
    <div className="EmployeeList boxdesign">
      <span className="fs-4 fw-semibold">Employee</span>
      <div className="mt-3 settion p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Employee List</span>
        <div className="mt-3 px-2 d-flex justify-content-between align-items-center flex-wrap mb-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <Link to="/employee">
              <button className="btn btn-dark btn-sm px-3">Add Employee</button>
            </Link>
          </div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table
            className="table table-striped text-capitalize"
            style={{ fontSize: "14px ", borderCollapse: "inherit" }}
          >
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Employee Name</th>
                <th>User Type</th>
                <th>Aadhar</th>
                <th>Salary Type</th>
                <th>Mobile</th>
                <th>State</th>
                <th>City</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, index) => (
                  <tr key={index} style={{ verticalAlign: "middle" }}>
                    <td>{emp.name}</td>
                    <td>{emp.userType}</td>
                    <td>{emp.aadhar}</td>
                    <td>{emp.salaryType}</td>
                    <td>{emp.mobile}</td>
                    <td>{emp.state}</td>
                    <td>{emp.city}</td>
                    <td>{emp.createdAt.split("T")[0]}</td>
                    <td>
                      <div className="divbtn">
                        {emp.update_ty === "A" ? (
                          <span>
                            <FaEdit
                              onClick={() => Edithandle(emp._id)}
                              title="Edit"
                            />
                            <FaDeleteLeft
                              onClick={() => Deletehandle(emp._id)}
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
                  <td colSpan="9" className="text-center text-danger">
                    No employee found
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={9}><span className="text-muted small">{`Records : 1 to ${employees.length} to  ${employees.length}`}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
