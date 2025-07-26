import React, { useState } from "react";
import "../Allinone/Pages/Refill.css";
import axios from "../AxiosConfig";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit, FaIdCard } from "react-icons/fa";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function AddConsumer() {
  const { employess,bool1,setBool1,alertM,setAlertM} = useContext(DataContext);
  const news = new Date();
  const today = news.toISOString().split("T")[0];
  const times = news.toLocaleTimeString();
  const [consumreType, setConsumerType] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [oldAmount, setOldAmount] = useState("0");
  const [totalAmount, setTotalAmount] = useState("0");
  const [remarks, setRemarks] = useState(0);
  const [paymentReceived, setPaymentReceived] = useState("0");
  const [equipmentNam, setEquipmentName] = useState("");
  const [currentRate, setCurrentRate] = useState(0);
  const [refill, setRefill] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [emptyRefill, setEmptyRefill] = useState(0);
  const [amount, setAmount] = useState(0);
  const [emptyBalance, setEmptyBalance] = useState("0");
  const [AddConsumer_List, setAddConsumer_List] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;
  // const [refillRows, setRefillRows] = useState([
  //   {
  //     equipmentName: "",
  //     currentRate: 0,
  //     refill: 0,
  //     discountRate: 0,
  //     discount: 0,
  //     emptyRefill: "",
  //     amount: 0,
  //     emptyBalance: ""
  //   }
  // ]);

  const [equipmentName2, setEquipmentName2] = useState("");
  const [currentRate2, setCurrentRate2] = useState(0);
  const [refill2, setRefill2] = useState(0);
  const [discountRate2, setDiscountRate2] = useState(0);
  const [discount2, setDiscount2] = useState(0);
  const [emptyRefill2, setEmptyRefill2] = useState("");
  const [amount2, setAmount2] = useState("");
  const [emptyBalance2, setEmptyBalance2] = useState("");

  const Equipment_name = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/consumerlist");
      setAddConsumer_List(res.data);
      
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
    if (id && editData) {
      setAmount(editData.amount),
        setConsumerType(editData.consumreType),
        setConsumerName(editData.consumerName),
        setCurrentRate(editData.currentRate),
        setDeliveryMan(editData.deliveryMan),
        setDiscount(editData.discount),
        setDiscountRate(editData.discountRate),
        setEmptyBalance(editData.emptyBalance),
        setEmptyRefill(editData.emptyRefill),
        setEquipmentName(editData.equipmentNam),
        setMobile(editData.mobile),
        setOldAmount(editData.oldAmount),
        setPaymentReceived(editData.paymentReceived),
        setRefill(editData.refill),
        setRemarks(editData.remarks),
        setTotalAmount(editData.totalAmount);
    }
  }, [id, editData]);

  function Edithandle(id, data) {
    navigate(`/kgRefill/bulk/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const valid = confirm("Delete Consumer Delivery");
    if (valid) {
      try {
        const res = await axios.delete(`/deleteconsumer/${id}`);
        res;
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/updateconsumer/${id}`, {
        consumreType,
        consumerName,
        mobile,
        deliveryMan,
        oldAmount,
        totalAmount,
        remarks,
        paymentReceived,
        equipmentNam,
        currentRate,
        refill,
        discountRate,
        discount,
        emptyRefill,
        amount,
        emptyBalance,
        update_ty: "U",
      });
      alert("Update Data");
      fetchEmployees();
    } else {
      setBool1(true);
      setAlertM("Consumer added successfully")
      await axios
        .post("/addconsumer", {
          consumreType,
          consumerName,
          mobile,
          deliveryMan,
          oldAmount,
          totalAmount,
          remarks,
          paymentReceived,
          equipmentNam,
          currentRate,
          refill,
          discountRate,
          discount,
          emptyRefill,
          amount,
          emptyBalance,
          times,
          update_ty: "A",
        })
        .then((res) => {
          fetchEmployees();
        })
        .catch((err) => err);
    }
    setAmount(""),
      setConsumerType(""),
      setConsumerName(""),
      setCurrentRate(""),
      setDeliveryMan(""),
      setDiscount(""),
      setDiscountRate(""),
      setEmptyBalance(""),
      setEmptyRefill(""),
      setEquipmentName(""),
      setMobile(""),
      setOldAmount(""),
      setPaymentReceived(""),
      setRefill(""),
      setRemarks(""),
      setTotalAmount("");
  };
   const fetchPrice = async () => {
      try {
         const res = await axios.get("/addratelist");
      const datas = res.data;

        const rateList = [...datas].reverse();

        const latestValidRate = rateList.find(
          (item) => item.equipment == equipmentNam && item.validTo >= today
        );

        if (latestValidRate) {
          setCurrentRate(latestValidRate.totalRsp);
        } else {
          setCurrentRate("");
          alert("Please Add Equipment Rate.");
        }
      } catch (err) {
        console.error("Error fetching rate list:", err.message);
      }
    };

  useEffect(() => {
    if (!equipmentNam) return;
    fetchPrice();
  }, [equipmentNam]);
  //   useEffect(() => {
  //    if (!equipmentName2) return;
  //    const fetchPrice = async () => {
  //      try {
  //        const rateList = [...data].reverse();

  //        ("Full Rate List:", rateList);

  //        const latestValidRate = rateList.find(
  //          (item) => item.equipment === equipmentName2 && item.validTo >= today
  //         );

  //          if (latestValidRate) {
  //          setCurrentRate2(latestValidRate.totalRsp);
  //        }
  //         else {
  //          setCurrentRate2("");
  //          alert("Please Add Equipment Rate.");
  //        }

  //      } catch (err) {
  //        console.error("Error fetching rate list:", err.message);
  //      }
  //    };
  //    fetchPrice();
  //  }, [equipmentName2]);

  function handleRemoveRow() {
    setShow(false);
  }
  function handleAddRow() {
    alert();
  }
  useEffect(() => {
    //     const totalAmount = refillRows.reduce((sum, row) => {
    //   const refill = Number(row.refill);
    //   const rate = Number(row.currentRate);
    //   const discount = refill * Number(row.discountRate);
    //   const amount = refill * rate - discount;

    //   return sum + amount;
    // }, 0);

    const totals = refill * currentRate;
    const discount = refill * discountRate;
    const netTotal = totals - discount;

    const totals2 = refill2 * currentRate2;
    const discount2 = refill2 * discountRate2;
    const netTotal2 = totals2 - discount2;
    const emptyBal=refill-emptyRefill;
    const total = netTotal + netTotal2;
    // setTotalAmount(totalAmount);
    setDiscount(discount);
    // setEmptyRefill(refill);
          setEmptyBalance(emptyBal),
    setAmount(netTotal);

    setDiscount2(discount2);
    // (discount2)
    setEmptyRefill2(refill2);
    setAmount2(netTotal2);

    setTotalAmount(total);
  }, [refill,emptyRefill ,discountRate, refill2, discountRate2]);
  //      const addRow = () => {
  //       setRefillRows([...refillRows, {
  //     equipmentName: "",
  //     currentRate: 0,
  //     refill: 0,
  //     discountRate: 0,
  //     discount: 0,
  //     emptyRefill: "",
  //     amount: 0,
  //     emptyBalance: ""
  //   }]);
  // };

  // const removeRow = (index) => {
  //   const updatedRows = [...refillRows];
  //   updatedRows.splice(index, 1);
  //   setRefillRows(updatedRows);
  // };
  // const handleRowChange = (index, field, value) => {
  //   const updatedRows = [...refillRows];
  //   updatedRows[index][field] = value;

  //   const currentRate = Number(updatedRows[index].currentRate);
  //   const refill = Number(updatedRows[index].refill);
  //   const discountRate = Number(updatedRows[index].discountRate);
  //     // (refillRows.equipmentName2[0])
  //   const total = refill * currentRate;
  //   const discount = refill * discountRate;
  //   const netAmount = total - discount;

  //   updatedRows[index].discount = discount;
  //   updatedRows[index].amount = netAmount;

  //   setRefillRows(updatedRows);
  // };
  // useEffect(()=>{
  //   setRefillRows(refillRows)
  //   //  (refillRows.discount)
  // },[handleRowChange])
  return (
    <div className="addconsumer allworking boxdesign">
      <span className="fs-4 fw-semibold mb-2"><FaIdCard /> Add Consumer</span>
       {bool1 && (
          <div className=" m-2 alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <div className="m-2 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm row">
          <div className="form-group col-md-3 ">
            <label>Consumer Type</label>
            <select onChange={(e) => setConsumerType(e.target.value)}>
              <option value="deliver man">Deliver Man</option>
              <option value="Staff">Staff</option>
              <option value="Vandor">Vendor</option>
              <option value="Consumer">Consumer</option>
            </select>
          </div>
          <div className="col-md-1 text-center">
            <label className="fw-semibold mt-3 fs-5 text-center text-center">
              OR
            </label>
          </div>
          <div className="form-group col-md-3 col-sm-6">
            <label>Consumer Name</label>
            <input
              type="text"
              value={consumerName}
              onChange={(e) => setConsumerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-3 col-sm-6">
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Enter Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>
        </div>
        <div className="m-2 settion p-3  bg-light rounded-3 border-top border-warning border-3 shadow-sm row">
          <div className="form-group col-md-3">
            <label>Delivery Man Name</label>
            <select
              value={deliveryMan}
              onChange={(e) => setDeliveryMan(e.target.value)}
            >
              <option>Select</option>
              {employess.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Old Amount Balance</label>
            <input
              type="number"
              value={oldAmount}
              onChange={(e) => setOldAmount(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Payment Received</label>
            <input
              type="text"
              value={paymentReceived}
              onChange={(e) => setPaymentReceived(e.target.value)}
            />
          </div>
        </div>

        <div className="m-2 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm row">
          <div className="form-group col-md-3 col-sm-4">
            <label>Equipment Name</label>
            <select
              value={equipmentNam}
              onChange={(e) => setEquipmentName(e.target.value)}
              required
            >
              <option value="">Select</option>
              {Equipment_name.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Current Rate</label>
            <input
              type="number"
              value={currentRate}
              name="currentRate"
              disabled
            />
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Refill</label>
            <input
              type="number"
              value={refill}
              required
              onChange={(e) => setRefill(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Discount Rate</label>
            <input
              type="number"
              value={discountRate}
              required
              onChange={(e) => setDiscountRate(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Discount</label>
            <input type="number" value={discount} disabled />
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Empty Refill Received</label>
            <input
              type="text"
              value={emptyRefill}
              onChange={(e) => setEmptyRefill(e.target.value)}
              
            />
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled
            />
          </div>
          <div className="form-group col-md-3 col-sm-4">
            <label>Empty Balance</label>
            <input
              type="number"
              value={emptyBalance}
              onChange={(e) => setEmptyBalance(e.target.value)}
            />
          </div>
        </div>
        {show && (
          <div className="m-2 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm row">
            <div className="form-group col-md-3 col-sm-4">
              <label>Equipment Name</label>
              <select
                value={equipmentName2}
                onChange={(e) => setEquipmentName2(e.target.value)}
              >
                <option>Select</option>
                {Equipment_name.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Current Rate</label>
              <input
                type="number"
                value={currentRate2}
                name="currentRate2"
                disabled
              />
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Refill</label>
              <input
                type="number"
                value={refill2}
                onChange={(e) => setRefill2(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Discount Rate</label>
              <input
                type="number"
                value={discountRate2}
                onChange={(e) => setDiscountRate2(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Discount</label>
              <input type="number" value={discount2} disabled />
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Empty Refill Received</label>
              <input
                type="text"
                value={emptyRefill2}
                onChange={(e) => setEmptyRefill2(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Amount</label>
              <input
                type="number"
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
                disabled
              />
            </div>
            <div className="form-group col-md-3 col-sm-4">
              <label>Empty Balance</label>
              <input
                type="number"
                value={emptyBalance2}
                onChange={(e) => setEmptyBalance2(e.target.value)}
              />
            </div>
            <div className="from-group col-md-3 mt-2">
              <button
                className="btn btn-danger btn-sm px-3"
                onClick={handleRemoveRow}
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        {/* {refillRows.map((row, index) => (
  <div key={index} className="row m-2 bg-light p-3 rounded border shadow-sm">
    <div className="form-group col-md-3">
      <label>Equipment Name</label>
      <select
        value={row.equipmentName}
        onChange={(e) => handleRowChange(index, "equipmentName", e.target.value)}
      >
        <option>Select</option>
        {Equipment_name.map((name, idx) => (
          <option key={idx} value={name}>{name}</option>
        ))}
      </select>
    </div>
    <div className="form-group col-md-3">
      <label>Current Rate</label>
      <input type="number" value={row.currentRate} disabled />
    </div>
    <div className="form-group col-md-2">
      <label>Refill</label>
      <input
        type="number"
        value={row.refill}
        onChange={(e) => handleRowChange(index, "refill", e.target.value)}
      />
    </div>
    <div className="form-group col-md-2">
      <label>Discount Rate</label>
      <input
        type="number"
        value={row.discountRate}
        onChange={(e) => handleRowChange(index, "discountRate", e.target.value)}
      />
    </div>
    <div className="form-group col-md-2">
      <label>Discount</label>
      <input type="number" value={row.discount} disabled />
    </div>
    <div className="form-group col-md-3">
      <label>Empty Refill Received</label>
      <input
        type="text"
        value={row.emptyRefill}
        onChange={(e) => handleRowChange(index, "emptyRefill", e.target.value)}
      />
    </div>
    <div className="form-group col-md-3">
      <label>Amount</label>
      <input type="number" value={row.amount} disabled />
    </div>
    <div className="form-group col-md-3">
      <label>Empty Balance</label>
      <input
        type="number"
        value={row.emptyBalance}
        onChange={(e) => handleRowChange(index, "emptyBalance", e.target.value)}
      />
    </div>
    {index > 0 && (
      <div className="form-group col-md-2 d-flex align-items-end">
        <button type="button" className="btn btn-danger btn-sm" onClick={() => removeRow(index)}>
          Remove
        </button>
      </div>
    )}
  </div>
))} */}

        <div className="d-flex justify-content-between px-3">
          <div className="mt-3">
            <button
              className="btn btn-secondary btn-sm px-3"
              type="button"
              onClick={handleAddRow}
            >
              Add Row
            </button>
          </div>
          <div className="mt-3">
            <button className="btn btn-dark btn-sm px-3" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
      <div className="boxdesign m-3 h-auto  p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm bg-white">
        <span className="fs-6 fw-semibold px-2">Refill List</span>
        <div className="my-3 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center  px-2">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div></div>
        </div>
        <div className="table-responsive px-2 pb-2 ">
          <table className="table table-striped " style={{ fontSize: "12px" }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Consumer Name</th>
                <th>EQ Name</th>
                <th>Dman Name</th>
                <th>Refill</th>
                <th>Empty Received</th>
                <th>Payment Received</th>
                <th>Empty Balance</th>
                <th>Amount Balance</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {AddConsumer_List.length > 0 ? (
                AddConsumer_List.map((item, index) => (
                  <tr key={index}>
                    <td>{item.consumerName}</td>
                    <td>{item.mobile}</td>
                    <td>{item.deliveryMan}</td>
                    <td>{item.refill}</td>
                    <td>{item.emptyRefill}</td>
                    <td>{item.paymentReceived}</td>
                    <td>{item.emptyBalance}</td>
                    <td>{item.amount}</td>
                    <td>{item.date.split("T")[0]}</td>
                    <td>
                      <div className="divbtn">
                        {item.update_ty == "A" ? (
                          <span>
                            <FaEdit
                              onClick={() => Edithandle(item._id, item)}
                              title="Edit"
                            />
                            <FaDeleteLeft
                              onClick={() => Deletehandle(item._id)}
                              title="Delete"
                              className="ms-3"
                            />
                          </span>
                        ) : (
                          <span
                            style={{ cursor: "not-allowed", color: "silver" }}
                          >
                            <FaEdit />
                            <FaDeleteLeft className="ms-3" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img src="xyz.jpg" alt="No data" className="my-4" />
                      <br />
                      <span className="text-success">
                        Add new record or search with different criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
               <tr>
             <td colSpan={11}>
                <span className="text-muted small">{`Records : 1 to ${AddConsumer_List.length} to  ${AddConsumer_List.length}`}</span>
                </td>
             </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddConsumer;
