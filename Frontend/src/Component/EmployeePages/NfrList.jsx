import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function NfrList() {
  const [nft_list, setNft_list] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:4001/nfrlist");
        setNft_list(res.data);
      } catch (err) {
        console.error(" Error fetching employee list:", err.message);
      }
    };
    fetchEmployees();
  }, []);

  function Edithandle(id, emp) {
    navigate(`/nfr/nfr/${id}`, { state: { empData: emp } });
  }
  async function Deletehandle(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`http://localhost:4001/deletenfr/${id}`);
      setNft_list(res.data);
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  return (
    <div className="nfrlist allworking boxdesign">
      <span className="fs-4 fw-semibold">NFR </span>
      <div className="settion mt-3 p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">NFR List</span>

        <div className="mt-3 px-2 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center mb-2">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/nfr/nfr">
              <button className="btn btn-dark btn-sm px-3 m-2">Add NFR</button>
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
                <th>Item Group</th>
                <th>NFR Name</th>
                <th>MOD Name</th>
                <th>Rate</th>
                <th>RSP</th>
                <th>Opening Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {nft_list.length > 0 ? (
                nft_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemGroup}</td>
                    <td>{item.vendorNames}</td>
                    <td>{item.modelName}</td>
                    <td>{item.nfrRate}</td>
                    <td>{item.nfrRsp}</td>
                    <td>{item.openingStock}</td>
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
                  <td colSpan={7} className="text-center align-middle">
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
              <span className=" text-end text-muted small">{`Records : 1 to ${nft_list.length} to  ${nft_list.length}`}</span>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NfrList;
