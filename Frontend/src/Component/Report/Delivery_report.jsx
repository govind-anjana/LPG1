import axios from "../AxiosConfig";
import React, { useState } from "react";

function Delivery_report() {
  const today = new Date().toISOString().split("T")[0];

  const [show, setShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);

  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    employee: "",
  });

  const employeeNames = [
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
      <span className="fs-4 fw-semibold">Reports</span>
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
                className="form-control"
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
                className="form-control"
              />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="employee">Employee Name</label>
              <select
                id="employee"
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select</option>
                {employeeNames.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
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
          <div className="mt-4">
            <h6 className="text-center">Delivery List</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Employee</th>
                    <th>Current Rate</th>
                    <th>Equipment</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData.length === 0 ? (
                    <tr>
                      <td colSpan="3">No records found</td>
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
