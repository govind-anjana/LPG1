import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "../../AxiosConfig";

function StockPage1() {
  const [current_stock, setCurrent_Stock] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/currntstock");
        setCurrent_Stock(res.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, []);
  const equiCode={
    1:"14.2 F",2:"14.2 E",4:"5 F",5:"5 E",7:"19 F",8:"19 E",10:"5 F POS",11:"5 E POS",13:"10 F",14:"10 E",15:"45.5 F",16:"45.5 E",26:"PR",27:"LPG Pressure Regulat"
  }
  const equipmentName = {
      1: "14.2 KG Filled Cyl Domestic" ,
      2: "14.2 KG Empty Cyl Domestic" ,
      4: "5 KG Filled Cyl Domestic" ,
      5: "5 KG Empty Cyl Domestic" ,
      7: "19 KG Filled Cyl CM" ,
      8: "19 KG Empty Cyl CM" ,
       10: "5 KG Filled Cyl FTL POS" ,
      11: "5 KG Empty Cyl FTL POS" ,
      13: "10 KG Filled Cyl Composite" ,
      14: "10 KG Empty Cyl Composite" ,
     15:	"45.5 KG Filled Cyl",
     16:"45.5 KG Empty Cyl",
     26:"LPG Pressure Regulator Sound",
     27:"LPG Pressure Regulator Defective All TYPE"
  }
  return (
    <div className="mt-3 settion p-2 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
      <div className="mt-3 px-2 d-flex justify-content-between align-items-center flex-wrap mb-2">
        <input type="text" placeholder="Search by name..." />
        <div></div>
      </div>
      <div className="table-responsive px-2 pb-2">
        <table
          className="table table-striped text-capitalize"
          style={{ fontSize: "14px ", borderCollapse: "inherit" }}
        >
          <thead className="table-secondary">
            <tr style={{ verticalAlign: "top", textAlign: "center" }}>
              <th>#</th>
              <th>Equipment Code</th>
              <th>Equipment Name</th>
              <th>Current Stock</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {current_stock.length > 0 ? (
              current_stock.map((emp, index) => (
                <tr key={index} style={{ verticalAlign: "middle" }}>
                  <td>{emp.sr}</td>
                  <td>{equiCode[emp.eqID]}</td>
                  <td>{equipmentName[emp.eqID]}</td>
                  <td>{emp.op_Stock}</td>
                  {/* <td>
                    <div className="divbtn ">
                      <FaEdit
                        className="me-2"
                        onClick={() => Edithandle(emp._id)}
                      />
                      <FaDeleteLeft onClick={() => Deletehandle(emp._id)} />
                    </div> 
                   </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-danger">
                  No employee found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockPage1;
