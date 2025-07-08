import React, { useState } from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";

function Allstock() {
  const [Allstock_list, setAllstock_list] = useState([]);
  const { addOneDay } = useContext(DataContext);
  const navigate=useNavigate()
  function handleEndOfDate() {  
      localStorage.removeItem("isLoggedIn");
      navigate("/");
      addOneDay();
  }
  return (
    <div className="allworking  boxdesign">
      <span className="fs-4 fw-semibold">All Stock</span>
      <div className="mt-3 settion p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">All Stock List</span>
        <div className="mt-2 px-2  d-flex flex-wrap justify-content-md-between justify-content-center align-items-center mb-2">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div></div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped" style={{ fontSize: "13px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Date</th>
                <th>Equipment Name</th>
                <th>Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {Allstock_list.length > 0 ? (
                Allstock_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date?.split("T")[0]}</td>
                    <td>{item.connection}</td>
                    <td>{item.itemType}</td>
                    <td>{item.deliveryMan}</td>
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
                      <img src="govind.jpg" alt="No data" className="my-4" />
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
                  <span className=" text-muted small">{`Records : 1 to ${Allstock_list.length} to  ${Allstock_list.length}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-sm btn-dark px-3" onClick={handleEndOfDate}>
        Do EOD
      </button>
    </div>
  );
}
export default Allstock;
