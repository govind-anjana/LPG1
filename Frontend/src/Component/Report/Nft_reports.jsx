import { AiOutlineLineChart } from "react-icons/ai";
import axios from "../AxiosConfig";
import React, { useState } from "react";

function Nft_report() {
  const today = new Date().toISOString().split("T")[0];
  const [show, setShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    itemgroup: "",
    reportType: "",
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
      const res = await axios.get("/nfrlist");
      const result = res.data;
      console.log(result)
      const filtered = result.filter(
        (item) =>
          item.date.split("T")[0] >= formData.dateFrom &&
          item.date.split("T")[0] <= formData.dateTo &&
          (!formData.itemgroup ||
            item.itemGroup?.toLowerCase() === formData.itemgroup.toLowerCase())
      );
      setDeliveryData(filtered);
      setShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch NFT data.");
    }
  };

  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold"><AiOutlineLineChart /> Reports</span>

      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold">Select Criteria</span>

        <form onSubmit={handleSubmit}>
          <div className="box-body row mt-2">
            <div className="form-group col-md-3">
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

            <div className="form-group col-md-3">
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
              <label htmlFor="itemgroup">Item Group</label>
              <select
                id="itemgroup"
                name="itemgroup"
                value={formData.itemgroup}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="rabar tube">Rabar Tube</option>
                <option value="hotplate">Hotplate</option>
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
              <label className="invisible">&nbsp;</label>
              <button type="submit" className="w-100 btn btn-dark btn-sm">
                Search
              </button>
            </div>
          </div>
        </form>
        {show && (
          <div className="mt-4">
            <h6 className="text-center">NFR Reports List</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                   
                    <th>Item Group</th>
                    <th>NFR Rate</th>
                    <th>Opening Stock</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData.length === 0 ? (
                    <tr>
                      <th colSpan="4" className="text-center text-danger">
                        No records found
                      </th>
                    </tr>
                  ) : (
                    deliveryData.map((item, index) => (
                      <tr key={index}>
                       
                        <td>{item.itemGroup}</td>
                        <td>{item.nfrRate}</td>
                        <td>{item.openingStock}</td>
                        <td>{item.remarks || "N/A"}</td>
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

export default Nft_report;
