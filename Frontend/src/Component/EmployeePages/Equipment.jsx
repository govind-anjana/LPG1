import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Equipment() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:4001/equipment");
        setEmployees(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);
  // console.log(employees)
  // const filteredEmployees = employees.filter((emp) =>
  //   emp.name.toLowerCase().includes(search.toLowerCase())
  // );

  function Edithandle(id,emp) {
    navigate(`/equipment/${id}`,{ state: { empData: emp } });
  }
  async function Deletehandle(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(
        `http://localhost:4001/deleteemployee/${id}`
      );
      setEmployees(res.data);
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  return (
    <div className="EmployeeList boxdesign">
      <span className="fs-4 fw-semibold">Equipment</span>

      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Equipment List</span>
        <div className="mt-3 px-2 d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>2</div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table
            className="table table-striped text-capitalize"
            style={{ fontSize: "13px ", borderCollapse: "inherit" }}
          >
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>ID</th>
                <th>Equipment Code</th>
                <th>Equipment Name</th>
                <th>Equipment Item Group</th>
                <th>Equipment Def</th>
                <th>Opening Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, index) => (
                  <tr key={index} style={{ verticalAlign: "middle" }}>
                    <td>{++index}</td>
                    <td>{emp.eqCode}</td>
                    <td>{emp.eqName}</td>
                    <td>{emp.eqItemGroup}</td>
                    <td>{emp.eqDef}</td>
                    <td>{emp.op_stock}</td>
                    <td>
                      <div className="divbtn">
                        {emp.update_flag === "A" ? (
                          <span>
                            <FaEdit onClick={()=>Edithandle(emp._id,emp)} title="Edit" />
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Equipment;
