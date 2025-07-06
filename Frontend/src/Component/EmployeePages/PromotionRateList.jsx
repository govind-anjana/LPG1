import React, { useEffect, useState } from "react";
import axios from "../AxiosConfig";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function PromotionRateList() {
  const [promotion_list, setPromotion_list] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/promotionlist");
      setPromotion_list(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  function Edithandle(id, data) {
    navigate(`/promotion/rate/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;
    {
      try {
         await axios.delete(`/deletepro/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="promotionrate allworking boxdesign">
      <span className="fs-4 fw-semibold">Promotion Rate</span>
      <div className=" settion mt-3 p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Promotion Rate List</span>
        <div className="mt-3 px-2 d-flex flex-wrap justify-content-between align-items-center mb-2">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/promotion/rate">
              <button className="btn btn-dark btn-sm px-3">Add Rate</button>
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
                <th>Promotion Rate</th>
                <th>Promotion Type</th>
                <th>Description</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {promotion_list.length > 0 ? (
                promotion_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rate}</td>
                    <td>{item.promotion}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.createdAt.split("T")[0]} {item.times}
                    </td>
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
                  <td colSpan={5} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img
                        src="xyz.jpg"
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
                <td colSpan={5}>
                  <span className=" text-muted small">{`Records : 1 to ${promotion_list.length} to  ${promotion_list.length}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PromotionRateList;
