import React, { useState } from "react";
import "./Navbar.css";
import { FaAngleDoubleRight, FaRegCreditCard, FaRupeeSign, FaTruck, FaUser } from "react-icons/fa";
import {IoIosDocument} from 'react-icons/io'
import { MdCurrencyRupee } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaGears } from "react-icons/fa6";
import {Link} from 'react-router-dom'

function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? "" : menuName);
  };

  const MenuItem = ({ label, name, icon, children }) => (
    <>
      <li>
        <a
          href="#"
          className={`d-flex align-items-center justify-content-between p-2 pe-3 text-decoration-none ${
            activeMenu === name ? "blackclass fw-bold text-warning "  : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            toggleMenu(name);
          }}
        >
         
          <span className="d-flex align-items-center">
            {icon && <span className="me-3">{icon}</span>}
            {label}
          </span>

           
          <span>{activeMenu === name ? "▼" : "►"}</span>
        </a>
      </li>
      {activeMenu === name && (
        <ul className="list-unstyled ps-3" style={{backgroundColor:' rgb(32, 31, 31)'}}>{children}</ul>
      )}
    </>
  );

  return (
    <>
    <div className="navber_container "
      style={{  minHeight: "91vh",  }}>
      <Link to="/" className="allinone p-2"><FaAngleDoubleRight className="me-3 my-2"/>All in One</Link>
      
      <ul className="list-unstyled">

        <MenuItem icon={<FaUser />} label="Master Data" name="master">
          <li>
            <Link to="/employee" className="p-0"><FaAngleDoubleRight className="me-2" />
              Add Employee
            </Link>
          </li>
          <li>
            <Link to="/employee_list" className="p-0"><FaAngleDoubleRight className="me-2" />
               Employee List
            </Link>
          </li>
          <li><Link to="/equipment" className="py-0"><FaAngleDoubleRight className="me-2" />
               Equipment List </Link>
          </li>
          <li><Link to="/agent" className="p-0"><FaAngleDoubleRight className="me-2" />
               Master Agent </Link>
          </li>
          <li><Link to="#" className="p-0"><FaAngleDoubleRight className="me-2" />
               Master Item Group NFR</Link>
          </li>
          <li><Link to="/promotion/rate" className="p-0"><FaAngleDoubleRight className="me-2" />
               Add Promotion Rate</Link>
          </li>
          <li><Link to="/promation" className="p-0"><FaAngleDoubleRight className="me-2" />
               Promotion Rate List</Link>
          </li>
          <li><Link to="/rate/rate" className="p-0"><FaAngleDoubleRight className="me-2" />
              Add Equipment Rate</Link>
          </li>
          <li><Link to="/rate" className="p-0"><FaAngleDoubleRight className="me-2" />
            Equipment Rate List</Link>
          </li>
          <li><Link to="/nfr/nfr" className="p-0"><FaAngleDoubleRight className="me-2" />
            Add NFR</Link>
          </li>
          <li><Link to="/nfr" className="p-0"><FaAngleDoubleRight className="me-2" />
            NFR List</Link>
          </li>

        </MenuItem>

        <MenuItem icon={<FaTruck />} label="Refill" name="refill">
          <li>
            <Link to="/Delivery" className="p-0">
             <FaAngleDoubleRight className="me-2" />Add Delivery
            </Link>
          </li>
          <li>
            <Link to="/DeliveryList" className="p-0">
             <FaAngleDoubleRight className="me-2" />Delivery List
            </Link>
          </li>
          <li>
            <Link to="/kgRefill" className="p-0">
             <FaAngleDoubleRight className="me-2" />Add 19 KG Refill
            </Link>
          </li>
          <li>
            <Link to="/kgRefill/bulk" className="p-0">
             <FaAngleDoubleRight className="me-2" />Add Consumer Delivery
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<IoIosDocument />} label="Document" name="document">
          <li>
            <Link to="/document/document" className="p-0">
             <FaAngleDoubleRight className="me-2" />Add Document
            </Link>
          </li>
          <li>
            <Link to="/document" className="p-0">
              <FaAngleDoubleRight className="me-2" />Document List
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<MdCurrencyRupee />} label="Sales" name="sales">
          <li>
            <Link to="/sales/sales" className="p-0">
             <FaAngleDoubleRight className="me-2" />Add Sales
            </Link>
          </li>
          <li>
            <Link to="/sales" className="p-0">
             <FaAngleDoubleRight className="me-2" />Sales List
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<FaRegCreditCard />} label="Expenses" name="expenses">
          <li>
            <Link to="expenses/expenses" className="p-0">
              <FaAngleDoubleRight className="me-2" />Add Expenses
            </Link>
          </li>
          
          <li>
            <Link to="/expensehead" className="p-0">
             <FaAngleDoubleRight className="me-2" />Expenses Head
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<MdCurrencyRupee/>} label="Bulk Document" name="bulk">
          <li>
            <Link to="/bulkDocument" className="p-0">
              <FaAngleDoubleRight className="me-2" />Add Bulk Document
            </Link>
          </li>
          <li>
            <Link to="/bulkDocumentList" className="p-0">
              <FaAngleDoubleRight className="me-2" />Bulk Document List
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<FaRegCreditCard/>} label="Deposit" name="deposit">
          <li>
            <a href="#" className="p-0">
              <FaAngleDoubleRight className="me-2" />Deposit Amount
            </a>
          </li>
          <li>
            <Link to="/depositCyl" className="p-0">
              <FaAngleDoubleRight className="me-2" />Deposit Cyl
            </Link>
          </li>
          <li>
            <Link to="/depositCylList" className="p-0">
              <FaAngleDoubleRight className="me-2" />Deposit Cyl List
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<MdCurrencyRupee/>} label="Penalty" name="penalty">
          <li>
            <Link to="/panalty" className="p-0">
              <FaAngleDoubleRight className="me-2" />Add Penalty
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<MdCurrencyRupee/>} label="Cash" name="cash">
          <li>
            <Link to="/cash" className="p-0">
              <FaAngleDoubleRight className="me-2" />Add Cash
            </Link>
          </li>
        </MenuItem>

        <MenuItem icon={<AiOutlineLineChart />} label="Reports" name="reports">
          <li>
            <Link to="/reports/main" className="p-0">
              <FaAngleDoubleRight className="me-2" />Main
            </Link>
          </li>
          <li>
            <Link to="/reports/Delivert" className="p-0">
             <FaAngleDoubleRight className="me-2" />Delivery Report
            </Link>
          </li>
          <li>
            <Link to="/reports/KgRefill" className="p-0">
             <FaAngleDoubleRight className="me-2" />19 KG Refill Report
            </Link>
          </li>
          <li>
            <Link to="/reports/Cash" className="p-0">
             <FaAngleDoubleRight className="me-2" />Cash Report
            </Link>
          </li>
          <li>
            <Link to="/reports/Sales" className="p-0">
             <FaAngleDoubleRight className="me-2" />Sales Report
            </Link>
          </li>
          <li>
            <Link to="/reports/Salary" className="p-0">
             <FaAngleDoubleRight className="me-2" />Salary Report
            </Link>
          </li>
          <li>
            <Link to="/reports/Document" className="p-0">
             <FaAngleDoubleRight className="me-2" />Document Report
            </Link>
          </li>
          <li>
            <Link to="/reports/expenses" className="p-0">
             <FaAngleDoubleRight className="me-2" />Expenses Report
            </Link>
          </li>
          <li>
            <Link to="/reports/nfr" className="p-0">
             <FaAngleDoubleRight className="me-2" />NFR Report
            </Link>
          </li>
          <li>
            <Link to="/reports/Otpreport" className="p-0">
             <FaAngleDoubleRight className="me-2" />DMAN OTP Report
            </Link>
          </li>
        </MenuItem>

        <MenuItem  icon={<FaGears />} label="System Settings" name="settings">
          <li>
            <Link to="/system/general" className="p-0">
              <FaAngleDoubleRight className="me-2" />General Setting
            </Link>
          </li>
          <li>
            <Link to="/system/SMS" className="p-0">
              <FaAngleDoubleRight className="me-2" />SMS Setting
            </Link>
          </li>
          <li>
            <Link to="/system/Email" className="p-0">
              <FaAngleDoubleRight className="me-2" />Email Setting
            </Link>
          </li>
        </MenuItem>
      </ul>
    </div>
    </>
  );
}

export default Navbar;
