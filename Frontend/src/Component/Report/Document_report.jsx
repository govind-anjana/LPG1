import axios from "axios";
import React, { useState } from "react";

function Document_report() {
  const today = new Date().toISOString().split("T")[0];
 const [show, setShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    delivery: "",
    docType: "",
    
  });
  const Delivery_Man_Names = [
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

  const handleSubmit =async (e) => {
    e.preventDefault();
      try {
      const res = await axios.get("http://localhost:4001/documentlist");
      const result = res.data;

     const filtered = result.filter((item) =>
  item.date.split("T")[0] >= formData.dateFrom &&
  item.date.split("T")[0] <= formData.dateTo &&
  (!formData.delivery || item.deliveryMan?.toLowerCase() === formData.delivery.toLowerCase()) &&
  (!formData.docType || item.itemType?.toLowerCase() === formData.docType.toLowerCase())
  
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
                className="form-control"
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
                className="form-control"
                value={formData.dateTo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="delivery">Delivery Man Name</label>
              <select
                id="delivery"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {Delivery_Man_Names.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="docType">Doc Type</label>
              <select
                id="docType"
                name="docType"
                value={formData.docType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="SV">SV</option>
                <option value="TV">TV</option>
                <option value="TTV">TTV</option>
                <option value="TSV">TSV</option>
                <option value="TCRV">TCRV</option>
                <option value="INYV">INTV</option>
              </select>
            </div>
            {/* <div className="form-group col-md-2">
              <label htmlFor="installationType">Installation Status</label>
              <select
                id="installationType"
                name="installationType"
                value={formData.installationType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
            <h6 className="text-center">Document Reports List</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Delivery Man Name</th>
                    <th>Document Type</th>
                    <th>Equipment Type</th>
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
                        <td>{item.deliveryMan}</td>
                        <td>{item.itemType}</td>
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

export default Document_report;
