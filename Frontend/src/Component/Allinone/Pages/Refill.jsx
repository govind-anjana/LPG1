import axios from "../../AxiosConfig";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import DataContext from "../../../Context/DataContext";

function DocumentForm() {
  const { data, date, bool1, setBool1, alertM, setAlertM, employess } =
    useContext(DataContext);
  const news = new Date();
  const times = news.toLocaleTimeString();
  const today = news.toISOString().split("T")[0];
  const oldToday = date.toLocaleDateString("en-CA");
  const [validTo, setValidTo] = useState(oldToday);
  const [currentRate, setCurrentRate] = useState(0);
  const [dmanID, setDmanID] = useState("");
  const [equipment, setEquipment] = useState("");
  const [totalCylinder, setTotalCyl] = useState(0);
  const [refill, setRefill] = useState(0);
  const [newConnection, setNewConnection] = useState("0");
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [remainingCylinder, setRemainingCylinder] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [cylinderQty, setCylinderQty] = useState(0);
  const [onlinePayments, setOnlinePayments] = useState(0);
  const [onlineExtraAmount, setOnlineExtraAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState("0");
  const [paidAmount, setPaidAmount] = useState(0);
  const [show, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [paymentType1, setPaymentType1] = useState("");
  const [cylinder1, setCylinder1] = useState(0);
  const [cylpayment1, setCylpayment1] = useState(0);
  const [onlineEx1, setOnlineEx1] = useState(0);

  const [paymentType2, setPaymentType2] = useState("");
  const [cylinder2, setCylinder2] = useState(0);
  const [cylpayment2, setCylpayment2] = useState(0);
  const [onlineEx2, setOnlineEx2] = useState(0);
  const [paymentType3, setPaymentType3] = useState("");
  const [cylinder3, setCylinder3] = useState(0);
  const [cylpayment3, setCylpayment3] = useState(0);
  const [onlineEx3, setOnlineEx3] = useState(0);

  const [stock, setStock] = useState([]);
  const [stockEm, setStockEm] = useState([]);
  const [stock1, setStock1] = useState([]);
  const [stockEm1, setStockEm1] = useState([]);
  const Equipment_name = [
    { id: 1, name: "14.2 KG Filled Cyl Domestic" },
    { id: 4, name: "5 KG Filled Cyl Domestic" },
    { id: 7, name: "19 KG Filled Cyl CM" },
    { id: 10, name: "5 KG Filled Cyl CM FTL POS" },
    { id: 13, name: "10 KG Filled Cyl Composite" },
    { id: 15, name: "45.5 KG Filled Cyl" },
    { id: 26, name: "LPG Pressure Regulator Sound" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stock) {
      const ids =  stock[0]._id;
      const ids2 =  stockEm[0]._id;
      const ids1 =  stock1[0]._id;
      const ids21 =  stockEm1[0]._id;

      const stocks = stock[0].op_Stock;
      const stocks2 = stockEm[0].op_Stock;
      const sto = parseInt(refill) + parseInt(newConnection);

      if (stocks > sto) {
        const remaining = parseInt(remainingCylinder || 0);
        const newStocks = stocks - sto;
        const cylinderempty = parseInt(refill) - parseInt(remaining);

        const newEmptyStock = Number(stocks2) + cylinderempty;
        await axios.put(`/updatestock/${ids}`, { op_Stock: newStocks });
        await axios.put(`/equipment/${ids1}`, { op_stock: newStocks });
        await axios.put(`/updatestock/${ids2}`, { op_Stock: newEmptyStock });
        await axios.put(`/equipment/${ids21}`, { op_stock: newEmptyStock });

        try {
          setBool1(true);
          setAlertM("Refill added successfully");
          await axios.post("/addDelivery", {
            validTo,
            currentRate,
            dmanID,
            equipment,
            totalCylinder,
            refill,
            newConnection,
            remainingAmount,
            remainingCylinder,
            paymentType,
            cylinderQty,
            onlinePayments,
            onlineExtraAmount,
            totalAmount,
            paidAmount,
            times,
            update_ty: "A",
          });
        } catch (err) {
          alert("Failed to save agent.", err.message);
        }
      } else {
        alert("Current Stock grather than Refill Delivery");
      }
    }

    setCurrentRate(""),
      setDmanID(""),
      setEquipment(""),
      setTotalCyl(""),
      setRefill(""),
      setNewConnection(""),
      setRemainingAmount(""),
      setRemainingCylinder(""),
      setPaymentType(""),
      setCylinderQty(""),
      setOnlinePayments(""),
      setOnlineExtraAmount(""),
      setTotalAmount(""),
      setPaidAmount();
    setCylinder1("");
    setCylpayment1(0);
  };
  function handleAddMore() {
    setShow1(true);
    if (show == true) {
      setShow2(true);
    }

    if (show2 == true) {
      setShow3(true);
    }
  }
  function equipmentHandle(e) {
    const selected = e.target.value;
    setEquipment(selected);
  }
  const fetchPrice = async () => {
    try {
      const res = await axios.get("/addratelist");
      const datas = res.data;

      const rateList = [...datas].reverse();

      const latestValidRate = rateList.find(
        (item) => item.equipment == equipment && item.validTo >= today
      );
      if (latestValidRate) {
        setCurrentRate(latestValidRate.totalRsp);
      } else {
        setCurrentRate(0);
        setRefill(0);
        setCylinderQty(0);
        alert("Please Add Equipment Rate.");
      }
    } catch (err) {
      console.error("Error fetching rate list:", err.message);
    }
  };
  useEffect(() => {
    if (!equipment) return;
    fetchPrice();
  }, [equipment]);

  useEffect(() => {
    if (!currentRate) return;
    const newConn = Number(newConnection) || 0;
    const totals = (Number(refill) + Number(newConn)) * Number(currentRate);
    const onlineCylAmount = Number(cylinderQty) * Number(currentRate);

    const cyl1Amount = Number(cylinder1) * Number(currentRate);
    const cyl2Amount = Number(cylinder2) * Number(currentRate);
    const cyl3Amount = Number(cylinder3) * Number(currentRate);
    const basePaid = totals - onlineCylAmount;
    const afterRemaining = basePaid - Number(remainingAmount);
    const afterExtra = afterRemaining - Number(onlineExtraAmount);
    const afterCyl1 = afterExtra - cyl1Amount;
    const afterEx1 = afterCyl1 - Number(onlineEx1);
    const afterCyl2 = afterEx1 - cyl2Amount;
    const afterEx2 = afterCyl2 - Number(onlineEx2);
    const afterCyl3 = afterEx2 - cyl3Amount;
    const finalPaid = Number(afterCyl3) - Number(onlineEx3);
    setTotalAmount(totals);
    setOnlinePayments(onlineCylAmount);
    setCylpayment1(cyl1Amount);
    setCylpayment2(cyl2Amount);
    setCylpayment3(cyl3Amount);
    setPaidAmount(finalPaid);
  }, [
    currentRate,
    refill,
    cylinderQty,
    newConnection,
    remainingAmount,
    onlineExtraAmount,
    currentRate,
    cylinder1,
    onlineEx1,
    cylinder2,
    onlineEx2,
    cylinder3,
    onlineEx3,
  ]);

  function handleRefill(e) {
    const values = e.target.value;
    setRefill(values);
    setTotalCyl(values);
  }
  function handleRemaining(e) {
    const res = e.target.value;
    if (res <= totalCylinder) {
      setRemainingCylinder(res);
    } else {
      setRemainingCylinder(0);
      alert("Remaining Cyl is more then total cyl!");
    }
  }
  function handleRemoveBtn() {
    setCylinder1(0);
    setCylpayment1(0);
    setOnlineEx1(0);
    setShow1(false);
  }
  function handleRemoveBtn2() {
    setCylinder2(0);
    setCylpayment2(0);
    setOnlineEx2(0);
    setShow2(false);
  }
  function handleRemoveBtn3() {
    setCylinder3(0);
    setCylpayment3(0);
    setOnlineEx3(0);
    setShow3(false);
  }
  const fetchData = async () => {
    try {
      const res = await axios.get("/currntstock");
      const res1 = await axios.get("/equipment");
      const data = res.data;
      const data1 = res1.data;
      const found = Equipment_name.find((item) => item.name === equipment);

      if (!found) {
        return;
      }
      const newdata = data.filter((item) => item.eqID == found.id);
      const newdata1 = data1.filter((item) => item.eqID == found.id);

      const ss = data.filter((item) => item.eqID == found.id + 1);
      const ss1 = data1.filter((item) => item.eqID == found.id + 1);

      setStockEm(ss);
      setStockEm1(ss1);
      if (newdata.length >= 0) {
        setStock(newdata);
        setStock1(newdata1);
      } else {
        setStock(null);
        setStock1(null);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [equipment]);
  return (
    <div className="refill settion p-3 rounded-3  border-warning border-3">
      <span className="fs-5 fw-semibold">Refill</span>
      {bool1 && (
        <div className="alert alert-success text-success my-2" role="alert">
          {alertM}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="box-body row">
          <div className="form-group col-md-3">
            <label>Valid To</label>
            <input
              type="date"
              name="validTo"
              value={validTo}
              className="custom-date-input"
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              onChange={(e) => setValidTo(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Current Rate</label>
            <input
              type="number"
              name="currentRate"
              value={currentRate}
              className="form-control"
              disabled
              required
            />
          </div>

          <div className="form-group col-md-3">
            <label>Delivery Man Name</label>
            <select
              name="dmanID"
              value={dmanID}
              onChange={(e) => setDmanID(e.target.value)}
              required
            >
              <option value="">Select</option>
              {employess.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label>Equipment Name</label>
            <select
              name="equipment"
              value={equipment}
              onChange={equipmentHandle}
              required
            >
              <option value="false">Select</option>
              {Equipment_name.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label>Total Cylinder</label>
            <input
              type="number"
              name="totalCylinder"
              value={currentRate ? totalCylinder : "0"}
              className="form-control"
              disabled
            />
          </div>

          <div className="form-group col-md-3">
            <label>Refill</label>
            <input
              type="number"
              name="refill"
              value={refill}
              onChange={handleRefill}
              required
            />
          </div>

          <div className="form-group col-md-2">
            <label>New Connection</label>
            <input
              type="number"
              name="newConnection"
              value={newConnection}
              onChange={(e) => setNewConnection(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label>Remaining Amount</label>
            <input
              type="number"
              name="remainingAmount"
              value={remainingAmount}
              onChange={(e) => setRemainingAmount(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label>Remaining Cylinder</label>
            <input
              type="number"
              name="remainingCylinder"
              value={remainingCylinder}
              onChange={handleRemaining}
            />
          </div>
          {show && (
            <div>
              <div className="form-group row">
                <div className="form-group col-md-3">
                  <label>Payment Type 1 </label>
                  <select
                    name="paymentType1"
                    value={paymentType1}
                    onChange={(e) => setPaymentType1(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="online">Online</option>
                    <option value="PayTm">PayTM</option>
                    <option value="google pay">Google Pay</option>
                    <option value="bhim upi">Bhim UPI</option>
                    <option value="cash">Cash</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label>Number of Cylinder</label>
                  <input
                    type="number"
                    name="cylinder1"
                    value={cylinder1}
                    onChange={(e) => setCylinder1(e.target.value)}
                  />
                </div>

                <div className="form-group col-md-2">
                  <label>Cyl Payment Amount </label>
                  <input
                    type="number"
                    name="cylpayment1"
                    value={cylpayment1}
                    readOnly
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>Online Extra Amount</label>
                  <input
                    type="number"
                    name="onlineExtraAmount"
                    value={onlineEx1}
                    onChange={(e) => setOnlineEx1(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-2">
                  <br />
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={handleRemoveBtn}
                    style={{ fontSize: "12px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
          {show2 && (
            <div>
              <div className="form-group row">
                <div className="form-group col-md-3">
                  <label>Payment Type </label>
                  <select
                    name="paymentType2"
                    value={paymentType2}
                    onChange={(e) => setPaymentType2(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="online">Online</option>
                    <option value="PayTm">PayTM</option>
                    <option value="google pay">Google Pay</option>
                    <option value="bhim upi">Bhim UPI</option>
                    <option value="cash">Cash</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label>Number of Cylinder</label>
                  <input
                    type="number"
                    name="cylinder2"
                    value={cylinder2}
                    onChange={(e) => setCylinder2(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>Cyl Payment Amount</label>
                  <input
                    type="number"
                    name="cylpayment2"
                    value={cylpayment2}
                    readOnly
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>Online Extra Amount</label>
                  <input
                    type="number"
                    name="onlineExtraAmount"
                    value={onlineEx2}
                    onChange={(e) => setOnlineEx2(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-2">
                  <br />
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={handleRemoveBtn2}
                    style={{ fontSize: "12px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
          {show3 && (
            <div>
              <div className="form-group row">
                <div className="form-group col-md-3">
                  <label>Payment Type 3</label>
                  <select
                    name="paymentType3"
                    value={paymentType3}
                    onChange={(e) => setPaymentType3(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="online">Online</option>
                    <option value="PayTm">PayTM</option>
                    <option value="google pay">Google Pay</option>
                    <option value="bhim upi">Bhim UPI</option>
                    <option value="cash">Cash</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label>Number of Cylinder</label>
                  <input
                    type="number"
                    name="cylinder3"
                    value={cylinder3}
                    onChange={(e) => setCylinder3(e.target.value)}
                  />
                </div>

                <div className="form-group col-md-2">
                  <label>Cyl Payment Amount</label>
                  <input
                    type="number"
                    name="cylpayment3"
                    value={cylpayment3}
                    readOnly
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>Online Extra Amount</label>
                  <input
                    type="number"
                    name="onlineExtraAmount"
                    value={onlineEx3}
                    onChange={(e) => setOnlineEx3(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-2">
                  <br />
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={handleRemoveBtn3}
                    style={{ fontSize: "12px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="form-group col-md-3">
            <label>Payment Type</label>
            <select
              name="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="online">Online</option>
              <option value="PayTm">PayTM</option>
              <option value="google pay">Google Pay</option>
              <option value="bhim upi">Bhim UPI</option>
              <option value="cash">Cash</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div className="form-group col-md-3">
            <label>Number of Cylinder</label>
            <input
              type="number"
              name="cylinderQty"
              value={cylinderQty}
              onChange={(e) => setCylinderQty(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label>Cyl Payment Amount</label>
            <input
              type="number"
              name="onlinePayments"
              value={onlinePayments}
              disabled
            />
          </div>

          <div className="form-group col-md-2">
            <label>Online Extra Amount</label>
            <input
              type="number"
              name="onlineExtraAmount"
              value={onlineExtraAmount}
              onChange={(e) => setOnlineExtraAmount(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <br />
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              style={{ fontSize: "12px" }}
              onClick={handleAddMore}
            >
              Add More
            </button>
          </div>
          <div className="form-group col-md-3">
            <label>Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={totalAmount}
              readOnly
            />
          </div>
          <div className="form-group col-md-3">
            <label>Total Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={paidAmount || ""}
              disabled
            />
          </div>
        </div>

        <div className="text-end mt-3 py-1">
          <button type="submit" className="btn btn-dark btn-sm px-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default DocumentForm;
