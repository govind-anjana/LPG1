import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import Navbar from "./Component/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLog from "./Component/Allinone/UserLog";
import AddEmployee from "./Component/EmployeePages/AddEmployee";
import EmployeeList from "./Component/EmployeePages/EmployeeList";
import Equipment from "./Component/EmployeePages/Equipment";
import Agent from "./Component/EmployeePages/Agent";
import AddPromotionRate from "./Component/EmployeePages/AddPromotionRate";
import PromotionRateList from "./Component/EmployeePages/PromotionRateList";
import AddRate from "./Component/EmployeePages/AddRate";
import RateList from "./Component/EmployeePages/RateList";
import AddNfr from "./Component/EmployeePages/AddNfr";
import NfrList from "./Component/EmployeePages/NfrList";
import AddDelivery from "./Component/Refill/AddDelivery";
import AddKgRefill from "./Component/Refill/AddKgRefill";
import AddConsumer from "./Component/Refill/AddConsumer";
import AddDocument from "./Component/DocumentFile/AddDocument";
import DocumentList from "./Component/DocumentFile/DocumentList";
import Sales from "./Component/Sales/Sales";
import SalesList from "./Component/Sales/SalesList";
import ExpenseList from "./Component/Expense/ExpenseList";
import Addexpense from "./Component/Expense/Addexpense";
import ExpenseHead from "./Component/Expense/ExpenseHead";
import BulkDocuments from "./Component/BulkDocument/BulkDocuments";
import DepositCyl from "./Component/Deposit/DepositCyl";
import AddPenalty from "./Component/Penalty/AddPenalty";
import AddCash from "./Component/Cash/AddCash";
import KgRefill_report from "./Component/Report/KgRefill_report";
import Cash_report from "./Component/Report/Cash_report";
import Sales_report from "./Component/Report/Sales_report";
import Salary_report from "./Component/Report/Salary_report";
import Document_report from "./Component/Report/Document_report";
import Nfr_reports from "./Component/Report/Nft_reports";
import Delivery_report from "./Component/Report/Delivery_report";
import General_Setting from "./Component/System_Setting/General_Setting";
import Sms_Setting from "./Component/System_Setting/Sms_Setting";
import Email_Setting from "./Component/System_Setting/Email_Setting";
import Otp_report from "./Component/Report/Otp_report";
import Expenses_report from "./Component/Report/Expenses_report";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  console.log(showMenu)
  return (
    <>
      <BrowserRouter>
        <Header />
        <input
          type="checkbox" id="checkbox"
        
        />
        <div className="row p-0 m-0">
            <div className="navbarpage active col-2 py-1">
              <Navbar />
            </div>
          <div
            className={`apps  ${
              showMenu ? "col-10" : "col-12"
            } bg-light p-2 px-4 my-1`}
          >
            <Routes>
              <Route path="/*" element={<UserLog />} />
              <Route path="/employee" element={<AddEmployee />} />
              <Route path="/employee_list" element={<EmployeeList />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/promotion/rate" element={<AddPromotionRate />} />
              <Route path="/promation" element={<PromotionRateList />} />
              <Route path="/rate/rate" element={<AddRate />} />
              <Route path="/rate" element={<RateList />} />
              <Route path="/nfr/nfr" element={<AddNfr />} />
              <Route path="/nfr" element={<NfrList />} />
              <Route path="/Delivery" element={<AddDelivery />} />
              <Route path="/kgRefill" element={<AddKgRefill />} />
              <Route path="/KgRefill/bulk" element={<AddConsumer />} />
              <Route path="/document/document" element={<AddDocument />} />
              <Route path="/document" element={<DocumentList />} />
              <Route path="/sales/sales" element={<Sales />} />
              <Route path="/sales" element={<SalesList />} />
              <Route path="/expenses/expenses" element={<Addexpense />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/expensehead" element={<ExpenseHead />} />
              <Route path="/bulkDocument" element={<BulkDocuments />} />
              <Route path="/depositCyl" element={<DepositCyl />} />
              <Route path="/panalty" element={<AddPenalty />} />
              <Route path="/cash" element={<AddCash />} />
              <Route path="/reports/Delivert" element={<Delivery_report />} />
              <Route path="/reports/KgRefill" element={<KgRefill_report />} />
              <Route path="/reports/Cash" element={<Cash_report />} />
              <Route path="/reports/Sales" element={<Sales_report />} />
              <Route path="/reports/Salary" element={<Salary_report />} />
              <Route path="/reports/Document" element={<Document_report />} />
              <Route path="/reports/expenses" element={<Expenses_report/>} />
              <Route path="/reports/nfr" element={<Nfr_reports />} />
              <Route
                path="/reports/Otpreport"
                element={<Otp_report></Otp_report>}
              />
              <Route path="/system/general" element={<General_Setting />} />
              <Route path="/system/Sms" element={<Sms_Setting />} />
              <Route path="/system/Email" element={<Email_Setting />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
