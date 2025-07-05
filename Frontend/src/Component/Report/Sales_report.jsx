import axios from "axios";
import React, { useState } from "react";

function Sales_report() {
  const today = new Date().toISOString().split("T")[0];
  const [show, setShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);

  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    nfrModel: "",
    equipment: "",
    reportType: "",
  });
  const Equipment_name = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
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
      const res = await axios.get("/api/salelist");
      const result = res.data;

      const filtered = result.filter(
        (item) =>
          item.createdAt.split("T")[0] >= formData.dateFrom &&
          item.date.split("T")[0] <= formData.dateTo &&
          (!formData.nfrModel ||
            item.conType?.toLowerCase() === formData.nfrModel.toLowerCase()) &&
          (!formData.equipment ||
            item.model?.toLowerCase() === formData.equipment.toLowerCase())
      );

      result;
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
              <label htmlFor="nfrModel">Connection Name</label>
              <select
                id="nfrModel"
                name="nfrModel"
                value={formData.nfrModel}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="nfr">Nfr</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="equipment">Equipment Name</label>
              <select
                id="equipment"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {Equipment_name.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="form-group col-md-2">
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
            </div> */}

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
            <h6 className="text-center">Sales Reports List</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Connection Type</th>
                    <th>Model</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData.length === 0 ? (
                    <tr>
                      <th colSpan="3" className="text-center text-danger">
                        No records found
                      </th>
                    </tr>
                  ) : (
                    deliveryData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date.split("T")[0]}</td>
                        <td>{item.conType}</td>
                        <td>{item.model || "N/A"}</td>
                        <td>{item.payment}</td>
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

export default Sales_report;
