import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import RefillForm from "./Pages/Refill";
import SalesPage from "./Pages/SalesPage";
import DocumentForm from "./Pages/Document";
import SummaryPage from "./Pages/SummaryPage";  
import StockPage from "./Pages/StockPage";     
import PlantTransaction from "./Pages/PlantTransaction";
import Kgrefill from "./Pages/Kgrefill";

function UserLog() {
  return (
    <div className="bg-white boxdesign ">
      <h5 className="mb-3">All In One</h5>
      <div className="p-0 ">
        <ul className="userdiv list-inline rounded-3" style={{fontWeight:'500',fontSize:"15px",backgroundColor:'black',border:'2px solid black'}}>
          <li className="list-inline-item ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded  ${isActive ? " bg-white border-3 text-black" : " text-white"}`
              }
            >
              Refill
            </NavLink>
          </li>
          <li className="list-inline-item ">
            <NavLink
              to="/Documents"
               className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded  ${isActive ? "bg-white border-3 text-black" : " text-white"}`
              }
            >
              Document
            </NavLink>
          </li>
          <li className="list-inline-item py-2">
            <NavLink
              to="/Sale"
               className={({ isActive }) =>
                `text-decoration-none  px-3 py-2 rounded   ${isActive ? "bg-white border-3 text-black" : "text-white"}`
              }
            >
              Sales
            </NavLink>
          </li>
          <li className="list-inline-item">
            <NavLink
              to="/summary"
               className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded   ${isActive ? "bg-white border-3 text-black" : "text-white"}`
              }
            >
              Summary
            </NavLink>
          </li>
          <li className="list-inline-item ">
            <NavLink
              to="/stock"
               className={({ isActive }) =>
                `text-decoration-none  px-3 py-2 rounded   ${isActive ? "bg-white border-3 text-black" : "text-white"}`
              }
            >
              Stock
            </NavLink>
          </li>
          <li className="list-inline-item ">
            <NavLink
              to="/plant-transaction"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${isActive ? "bg-white border-3 text-black" : "text-white"}`
              }
            >
              Plant Transaction
            </NavLink>
          </li>
          <li className="list-inline-item">
            <NavLink
              to="/kgrefill19"
              className={({ isActive }) =>
                `text-decoration-none  px-3 py-2 rounded  ${isActive ? "bg-white border-3 text-black" : "text-white"}`
              }
            >
              19 Kg Refill
            </NavLink>
          </li>
        </ul>

      <div className="bg-light userlog">
        <Routes>
          <Route path="/" element={<RefillForm />} />
          <Route path="/Documents" element={<DocumentForm />} />
          <Route path="/Sale" element={<SalesPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/plant-transaction" element={<PlantTransaction/>} />
          <Route path="/kgrefill19" element={<Kgrefill/>} />
        </Routes>
      </div>
      </div>
    </div>
  );
}

export default UserLog;
