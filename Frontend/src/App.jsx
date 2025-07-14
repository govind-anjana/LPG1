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
import DeliveryList from "./Component/Refill/DeliveyList";
import BulkDocumentList from "./Component/BulkDocument/BulkDocumentList";
import DepositCyllist from "./Component/Deposit/DepositCyllist";
import Main_report from "./Component/Report/Main_report";
import DataProvider from "./Context/DataProvider";
import EditEquipment from "./Component/EmployeePages/EditEquipment";
import { useEffect, useRef, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Allstock from "./Component/AllStock/Allstock";
import ChangePassword from "./ChangePassword";
function App() {
  const checkboxRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleSidebarClose = () => {
  if (checkboxRef.current) {
    checkboxRef.current.checked = false;
    setIsChecked(false);
  }
};
  useEffect(() => {
    if (window.innerWidth <= 400 && checkboxRef.current) {
      checkboxRef.current.checked = false;
      setIsChecked(false);
    }
  }, []);
  return (
    <DataProvider>
        <Header />
        <label htmlFor="sidebarToggle" className="applabel">
          {isChecked ? <IoClose /> : <IoMenu />}
        </label>
        <input
          type="checkbox"
          id="sidebarToggle"
          onChange={handleChange}
          defaultChecked
           ref={checkboxRef}
        />
        <div className="d-flex maindiv">
          <div className="sidebar">
            <Navbar onLinkClick={handleSidebarClose} />
          </div>
          <div className="main-content flex-grow-1 mx-md-2 px-md-3 p-2">
            <Routes>
              <Route path="/change-password" element={<ChangePassword/>}/>
              <Route path="/*" element={<UserLog />} />
              <Route path="/employee" element={<AddEmployee />} />
              <Route path="/getall_stock_details" element={<Allstock/>} />
              <Route path="/employee_list" element={<EmployeeList />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:id" element={<EditEquipment />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/agent/:id" element={<Agent />} />

              <Route path="/promotion/rate" element={<AddPromotionRate />} />
              <Route
                path="/promotion/rate/:id"
                element={<AddPromotionRate />}
              />
              <Route path="/promation" element={<PromotionRateList />} />
              <Route path="/rate/rate" element={<AddRate />} />
              <Route path="/rate/rate/:id" element={<AddRate />} />
              <Route path="/rate" element={<RateList />} />
              <Route path="/nfr/nfr" element={<AddNfr />} />
              <Route path="/nfr/nfr/:id" element={<AddNfr />} />
              <Route path="/nfr" element={<NfrList />} />
              <Route path="/Delivery" element={<AddDelivery />} />
              <Route path="/Delivery/:id" element={<AddDelivery />} />
              <Route path="/DeliveryList" element={<DeliveryList />} />
              <Route path="/kgRefill" element={<AddKgRefill />} />
              <Route path="/kgRefill/:id" element={<AddKgRefill />} />
              <Route path="/KgRefill/bulk" element={<AddConsumer />} />
              <Route path="/KgRefill/bulk" element={<AddConsumer />} />
              <Route path="/KgRefill/bulk/:id" element={<AddConsumer />} />
              <Route path="/document/document" element={<AddDocument />} />
              <Route path="/document/document/:id" element={<AddDocument />} />
              <Route path="/document" element={<DocumentList />} />
              <Route path="/sales/sales" element={<Sales />} />
              <Route path="/sales/sales/:id" element={<Sales />} />
              <Route path="/sales" element={<SalesList />} />
              <Route path="/expenses/expenses" element={<Addexpense />} />
              <Route path="/expenses/expenses/:id" element={<Addexpense />} />

              <Route path="/expensehead" element={<ExpenseHead />} />
              <Route path="/expensehead/:id" element={<ExpenseHead />} />

              <Route path="/bulkDocument" element={<BulkDocuments />} />
              <Route path="/bulkDocument/:id" element={<BulkDocuments />} />
              <Route path="/bulkDocumentList" element={<BulkDocumentList />} />
              <Route path="/depositCyl" element={<DepositCyl />} />
              <Route path="/depositCyl/:id" element={<DepositCyl />} />
              <Route path="/depositCylList" element={<DepositCyllist />} />
              <Route path="/panalty" element={<AddPenalty />} />
              <Route path="/panalty/:id" element={<AddPenalty />} />
              <Route path="/cash" element={<AddCash />} />
              <Route path="/cash/:id" element={<AddCash />} />
              <Route path="/reports/Main" element={<Main_report />} />
              <Route path="/reports/Delivert" element={<Delivery_report />} />
              <Route path="/reports/KgRefill" element={<KgRefill_report />} />
              <Route path="/reports/Cash" element={<Cash_report />} />
              <Route path="/reports/Sales" element={<Sales_report />} />
              <Route path="/reports/Salary" element={<Salary_report />} />
              <Route path="/reports/Document" element={<Document_report />} />
              <Route path="/reports/expenses" element={<Expenses_report />} />
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
     
    </DataProvider>
  );
}

export default App;
