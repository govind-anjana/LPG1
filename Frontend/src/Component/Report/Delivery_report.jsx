import { AiOutlineLineChart } from "react-icons/ai";
import axios from "../AxiosConfig";
import React, { useState } from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";

function Delivery_report() {
  const { employess } = useContext(DataContext);
  const today = new Date().toISOString().split("T")[0];

  const [show, setShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);

  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    employee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/deliverylist");
      const result = res.data;
      // console.log(result)

      const filtered = result.filter(
        (item) =>
          (!formData.employee || item.dmanID == formData.employee) &&
          item.validTo >= formData.dateFrom &&
          item.date.split("T")[0] <= formData.dateTo
      );

      setDeliveryData(filtered);
      setShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch delivery data.");
    }
  };

  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">
        <AiOutlineLineChart /> Reports
      </span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold">Delivery Report</span>

        <form onSubmit={handleSubmit}>
          <div className="box-body row mt-2">
            <div className="form-group col-md-3">
              <label htmlFor="dateFrom">Date From</label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="dateTo">Date To</label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="employee">Employee Name</label>
              <select
                id="employee"
                name="employee"
                value={formData.employee}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {employess.map((item, idx) => (
                  <option key={idx} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-3">
              <label className="invisible">Search</label>
              <button type="submit" className="w-100 btn btn-dark btn-sm">
                Search
              </button>
            </div>
          </div>
        </form>

        {show && (
          <div className="my-2">
            <hr />
            {/* <h6 className="text-center text-primary">Delivery List</h6> */}
            <div className="table-responsive">
              <table
                className="table table-bordered table-striped table-hover"
                style={{ fontSize: "14px " }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th colSpan="5" className="text-center text-primary fs-6">
                      Delivery List
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Employee</th>
                    <th>Current Rate</th>
                    <th>Equipment</th>
                  </tr>
                  {deliveryData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-danger">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    deliveryData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.validTo}</td>
                        <td>{item.date.split("T")[0]}</td>
                        <td>{item.dmanID}</td>
                        <td>{item.currentRate || "N/A"}</td>
                        <td>{item.equipment}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Delivery_report;
