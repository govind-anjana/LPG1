import axios from "../AxiosConfig";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit,FaRegCreditCard  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../Context/DataContext";

function AddExpense() {
   const {bool1,setBool1,alertM,setAlertM,employess}=useContext(DataContext)
  const times = new Date().toLocaleTimeString();
  const [userType, setUserType] = useState("");
  const [names, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseHead, setExpenseHead] = useState("");
  const [description, setDescription] = useState("");
  const [expenseName, setExpenseName] = useState([]);
  const [Expense_List, setExpense_list] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/expenselist");
      setExpense_list(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    if (id && editData) {
      setAmount(editData.amount);
      setDescription(editData.description);
      setExpenseHead(editData.expenseHead);
      setUserType(editData.userType);
      setName(editData.names);
    }
    const fetchapi = async () => {
      try {
        const res = await axios.get("/expenseheadlist");
        setExpenseName(res.data);
        // alert(res.data)
      } catch (err) {
        console.error(" Error fetching employee list:", err.message);
      }
    };
    fetchapi();
    fetchEmployees();
  }, [id, editData]);

   useEffect(()=>{
          const filters=employess.filter(item=>(item.userType===userType))
           setFilteredEmployees(filters);
           
    },[userType,employess])
  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      const res = await axios.put(`/updateexpense/${id}`, {
        userType,
        names,
        expenseHead,
        amount,
        description,
        update_ty: "U",
        times,
      });
      alert("Data Update");
      fetchEmployees();
    } else {
        setBool1(true);
      setAlertM("Expense added successfully")
      try {
       await axios.post("/addexpense", {
          userType,
          names,
          expenseHead,
          amount,
          description,
          times,
          update_ty: "A",
        });
       
        fetchEmployees();
      } catch (err) {
        alert("Failed to save agent.", err.message);
      }
    }
    setAmount(""),
      setDescription(""),
      setExpenseHead(""),
      setName(""),
      setUserType("");
  }
  function Edithandle(id, emp) {
    navigate(`/expenses/expenses/${id}`, { state: { empData: emp } });
  }
  async function Deletehandle(id) {
    const valid = confirm("Are you sure you want to delete this item?");
    if (valid) {
      try {
        const res = await axios.delete(`/deleteexpense/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  return (
    <div className="expensehead allworking boxdesign">
      <span className="fs-4 fw-semibold"> <FaRegCreditCard /> Expenses</span>
     
      <div className="d-md-flex mt-1 gap-4 flex-wrap ">
        <div className="headdiv settion p-3 bg-light rounded-2  border-warning border-3 shadow-sm ">
          <span className="fs-6 fw-semibold">Add Expenses</span>
            {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
     
          <form onSubmit={handleSubmit}>
            <div className="box-body row mt-1">
              <div className="form-group mb-2">
                <label htmlFor="userType">User Type</label>
                <select
                  required
                  id="userType"
                  name="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Delivery Man">Delivery Man</option>
                  <option value="Staff">Staff</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Consumer">Consumer</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                 <select
                  name="employeeName"
                  value={names}
                  onChange={(e) => setName(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {filteredEmployees.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="ehead">Expense Head</label>
                <select
                  id="ehead"
                  name="ehead"
                  value={expenseHead}
                  onChange={(e) => setExpenseHead(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {expenseName.map((item, index) => (
                    <option key={index} value={item.expenseH}>
                      {item.expenseH}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="desc">Description</label>
                <br />
                <textarea
                  id="desc"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="text-end my-1">
              <button type="submit" className="btn btn-dark dtn-sm px-3">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="flex-fill settion p-2 bg-light rounded-2 border-warning border-3 shadow-sm">
          <span className="fs-6 fw-semibold px-2">Expense List</span>
          <br />
          <div className="mt-3 px-2 d-flex justify-content-between align-items-center">
            <input
              className="me-2"
              type="text"
              placeholder="Search..."
              style={{ maxWidth: "180px" }}
            />
            <div></div>
          </div>
          <div className="table-responsive px-1 pb-2 ">
            <table className="table table-striped" style={{ fontSize: "13px" }}>
              <thead className="table-secondary">
                <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                  <th>User Type</th>
                  <th>Name</th>
                  <th>Expense Head</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Expense_List.length > 0 ? (
                  Expense_List.map((item, index) => (
                    <tr key={index}>
                      <td>{item.userType}</td>
                      <td>{item.names}</td>
                      <td>{item.expenseHead}</td>
                      <td>{item.amount}</td>
                      <td>{item.date?.split("T")[0]}</td>
                      <td>
                        <div className="divbtn text-center">
                          <FaEdit
                            className="me-2"
                            onClick={() => Edithandle(item._id, item)}
                          />
                          <FaDeleteLeft
                            onClick={() => Deletehandle(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center align-middle">
                      <div className="text-center py-3">
                        <span className="text-warning">
                          No data available in table
                        </span>
                        <br />
                        <img src="xzj.jpg" alt="No data" className="my-4" />
                        <br />
                        <span className="text-success">
                          Add new record or search with different criteria.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={6}>
                    <span className=" text-muted small">{`Records : 1 to ${Expense_List.length} to  ${Expense_List.length}`}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
