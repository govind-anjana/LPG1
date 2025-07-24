import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";

import RefillForm from "./Pages/Refill";
import DocumentForm from "./Pages/Document";
import SummaryPage from "./Pages/SummaryPage";
import PlantTransaction from "./Pages/PlantTransaction";
import Kgrefill from "./Pages/Kgrefill";
import StockPage from "./Pages/StockPage";
import SalePage from "./Pages/SalePage";

function UserLog() {
  return (
    <div className="bg-white boxdesign">
      <h5 className="mb-3">All In One</h5>
      <div className="p-0">
        <ul
          className="userdiv list-inline rounded-3"
          style={{
            fontWeight: "500",
            fontSize: "15px",
            backgroundColor: "black",
            border: "2px solid black",
          }}
        >
          <li className="list-inline-item py-2">
            <NavLink
              to="/app/refill"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              Refill
            </NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink
              to="/app/documents"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              Document
            </NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink
              to="/app/sale"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              Sales
            </NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink
              to="/app/summary"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              Summary
            </NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink
              to="/app/stock"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              Stock
            </NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink
              to="/app/plant-transaction"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              Plant Transaction
            </NavLink>
          </li>
          <li className="list-inline-item p-2">
            <NavLink
              to="/app/kgrefill19"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${
                  isActive ? "bg-white border-3 text-black" : "text-white"
                }`
              }
            >
              19 Kg Refill
            </NavLink>
          </li>
        </ul>

        <div className="bg-light userlog ">
        
          <Routes>
            <Route path="/" element={<Navigate to="/app/refill" />} />
            <Route path="/refill" element={<RefillForm />} />
            <Route path="/documents" element={<DocumentForm />} />
            <Route path="/sale" element={<SalePage/>}/>
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/plant-transaction" element={<PlantTransaction />} />
            <Route path="/plant-transaction/:id" element={<PlantTransaction />} />
            <Route path="/kgrefill19" element={<Kgrefill />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserLog;
