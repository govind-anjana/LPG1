import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function DeliveryList() {
  const [delivery_list, setDelivery_list] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:4001/deliverylist");
        setDelivery_list(res.data);
        
      } catch (err) {
        console.error(" Error fetching employee list:", err.message);
      }
    };
    fetchEmployees();
  }, []);

  function Edithandle(id) {
    alert(id);
  }
  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
      try {
        const res = await axios.delete(
          `http://localhost:4001/deletedelivery/${id}`
        );
        setDelivery_list(res.data);
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Delivery </span>
      <div className="settion mt-3 p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Delivery List</span>

        <div className="my-2 px-2 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center ">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div>
            <Link to="/Delivery">
              <button className="btn btn-dark btn-sm px-3 m-2">
                Add Delivery
              </button>
            </Link>
          </div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table
            className="table table-striped text-capitalize"
            style={{ fontSize: "12px ", borderCollapse: "inherit" }}
          >
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Date</th>
                <th>Name</th>
                <th>Equipment</th>
                <th>QTY</th>
                <th>Refill</th>
                <th>New Cons</th>
                <th>Total Paid</th>
                <th>Remaining Amount</th>
                <th>Online Payment</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {delivery_list.length > 0 ? (
                delivery_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.validTo}</td>
                    <td>{item.dmanID}</td>
                    <td>{item.equipment}</td>
                    <td>{item.totalCylinder}</td>
                    <td>{item.refill}</td>
                    <td>{item.newConnection}</td>
                    <td>{item.paidAmount}</td>
                    <td>{item.remainingAmount}</td>
                    <td>
                      {item.totalAmount - item.paidAmount - item.remainingAmount}
                    </td>
                    <td>{item.totalAmount}</td>
                    <td>
                      <div className="divbtn">
                        <FaEdit
                          className="me-2"
                          onClick={() => Edithandle(item._id)}
                        />
                        <FaDeleteLeft onClick={() => Deletehandle(item._id)} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center align-middle">
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
          <span className=" text-end text-muted small">{`Records : 1 to ${delivery_list.length} to  ${delivery_list.length}`}</span>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DeliveryList;
