import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import {Link} from 'react-router-dom'
function PromotionRateList() {
  const [promotion_list, setPromotion_list] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:4001/promotionlist");
        setPromotion_list(res.data);
      } catch (err) {
        console.error(" Error fetching employee list:", err.message);
      }
    };
    fetchEmployees();
  }, []);
 function Edithandle(){
    alert()
  }
 async function Deletehandle(id){
       try {
    const res = await axios.delete(`http://localhost:4001/deleteemployee/${id}`);
    setEmployees(res.data);
  } catch (err) {
    console.error("Error deleting employee:", err.message);
  }
  }
  return (
    <div className="promotionrate allworking boxdesign">
      <span className="fs-4 fw-semibold">Promotion Rate</span>
      <div className=" settion mt-3 p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-2">Promotion Rate List</span>
        <div className="mt-3 px-2 d-flex flex-wrap justify-content-between align-items-center mb-2">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div><Link to="/promotion/rate"><button className="btn btn-dark btn-sm px-3">Add Rate</button></Link></div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped text-capitalize" style={{ fontSize: "14px ", borderCollapse:'inherit' }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top",textAlign:'center'  }}>
                <th>Promotion Rate</th>
                <th>Promotion Type</th>
                <th>Description</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {promotion_list.length > 0 ? (
                promotion_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rate}</td>
                    <td>{item.promotion}</td>
                    <td>{item.description}</td>
                    <td>{(item.createdAt).split("T")[0]} {(item.times)}</td>
                    <td> <div className="divbtn fs-5 "><FaEdit className="me-2" onClick={Edithandle} /><FaDeleteLeft onClick={()=>Deletehandle(item._id)} /></div></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img
                        src="http://plceholder.com/150"
                        alt="No data"
                        className="my-4"
                      />
                      <br />
                      <span className="text-success">
                        Add new record or search with different criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PromotionRateList;
