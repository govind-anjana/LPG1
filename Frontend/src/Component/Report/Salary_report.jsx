import React, { useState } from "react";

function Salary_report() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    employee: "",
    reportType: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `From: ${formData.dateFrom}, To: ${formData.dateTo}, Employee: ${formData.employee}, Report Type: ${formData.reportType}`
    );
  };

  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold">Reports</span>

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
                {employeeNames.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
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
