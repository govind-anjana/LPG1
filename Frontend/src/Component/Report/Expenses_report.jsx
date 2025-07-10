import { AiOutlineLineChart } from "react-icons/ai";
import axios from "../AxiosConfig";
import React, { useState } from "react";

function Expenses_report() {
  const today = new Date().toISOString().split("T")[0];
  const [show, setShow] = useState(false);
    const [deliveryData, setDeliveryData] = useState([]);
  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    userType: "",
    equipment: "",
    reportType: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
     try {
      const res = await axios.get("/expenselist");
      const result = res.data;

     const filtered = result.filter((item) =>
  item.date.split("T")[0] >= formData.dateFrom &&
  item.date.split("T")[0] <= formData.dateTo &&
  (!formData.userType || item.userType === formData.userType) &&
  (!formData.reportType || item.reportType?.toLowerCase() === formData.reportType.toLowerCase())
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
      <span className="fs-4 fw-semibold"><AiOutlineLineChart /> Reports</span>

      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold">Select Criteria</span>

        <form onSubmit={handleSubmit}>
          <div className="box-body row mt-2">
            <div className="form-group col-md-2">
              <label htmlFor="dateFrom">Date From</label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="dateTo">Date To</label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="nfrModel">User Type</label>
              <select
                id="nfrModel"
                name="nfrModel"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="delivery Man">Delivery Man</option>
                <option value="staff">Staff</option>
                <option value="vendor">Vendor</option>
                <option value="consumer">Consumer</option>
              </select>
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="reportType">Report Type</label>
              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Details Report">Details Report</option>
                <option value="Summary Report">Summary Report</option>
              </select>
            </div>

            <div className="form-group col-md-2">
              <label className="invisible">Search</label>
              <button type="submit" className="w-100 btn btn-dark btn-sm">
                Search
              </button>
            </div>
          </div>
        </form>
         {show && (
          <div className="mt-4">
            <h6 className="text-center">Document Reports List</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Expenses Head</th>
                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData.length === 0 ? (
                    <tr>
                      <th colSpan="4" className="text-center text-danger">No records found</th>
                    </tr>
                  ) : (
                    deliveryData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date.split("T")[0]}</td>
                        <td>{item.names}</td>
                        <td>{item.expenseHead}</td>
                        <td>{item.userType}</td>
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

export default Expenses_report;
