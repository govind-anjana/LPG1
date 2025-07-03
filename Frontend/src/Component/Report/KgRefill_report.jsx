import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function KgRefill_report() {
  const today = new Date().toISOString().split("T")[0];
  const [show, setShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const [namelist,setNameList]=useState([])
  const [formData, setFormData] = useState({
    dateFrom: today,
    dateTo: today,
    consumer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 useEffect(() => {
    const fetchNames = async () => {
      try {
        const results = await axios.get("http://localhost:4001/kgrefilllist");
        setNameList(results.data);
      } catch (err) {
        console.error("Failed to load consumer list", err);
      }
    };
    fetchNames();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:4001/kgrefilllist");
      const result = res.data;
      
      const filtered = result.filter(
        (item) =>
          (!formData.consumer || (item.consumerName).toLowerCase() == (formData.consumer).toLowerCase() ) &&
          (item.date.split("T")[0]) >= formData.dateFrom &&
          item.date.split("T")[0] <= formData.dateTo
      );
        // console.log(filtered);

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
              <label htmlFor="consumer">Consumer Name</label>
              <select
                id="consumer"
                name="consumer"
                value={formData.consumer}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {namelist.map((item,index)=>(
                  <option key={index} value={item.consumerName}>{item.consumerName}</option>
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
    <h6 className="text-center">Report List</h6>
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Consumer Name</th>
          <th>Delivery Man Name</th>
          <th>Quantity</th> 
        </tr>
      </thead>
      <tbody>
         {deliveryData.length == 0 ? (
                  <tr><th colSpan="3" className="text-center text-danger" >No records found</th></tr>
                ) : (deliveryData.map((item, index) => (
          <tr key={index}>
            <td>{item.date.split("T")[0]}</td>
            <td>{item.consumerName}</td>
            <td>{item.deliveryMan}</td>
            <td>{item.refill}</td>
          </tr>
        ))
        )}
      </tbody>
    </table>
  </div>
)}
      </div>
    </div>
  );
}

export default KgRefill_report;
