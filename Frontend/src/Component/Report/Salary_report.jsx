import React, { useState } from "react";
import { useContext } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import DataContext from "../../Context/DataContext";

function Salary_report() {
  const today = new Date().toISOString().split("T")[0];
  const {employess}=useContext(DataContext)
  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    employee: "",
    reportType: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `From: ${formData.dateFrom}, To: ${formData.dateTo}, Employee: ${formData.employee}, Report Type: ${formData.reportType}`
    );
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
      </div>
    </div>
  );
}

export default Salary_report;
