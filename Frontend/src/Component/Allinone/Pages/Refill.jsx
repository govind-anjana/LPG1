import axios from "axios";
import React, { useEffect, useState } from "react";

function DocumentForm() {
  const news = new Date();
  const times = news.toLocaleTimeString();
  const today = news.toISOString().split("T")[0];
  const [validTo, setValidTo] = useState(today);
  const [currentRate, setCurrentRate] = useState("");
  const [dmanID, setDmanID] = useState("");
  const [equipment, setEquipment] = useState("");
  const [totalCylinder, setTotalCyl] = useState("0");
  const [refill, setRefill] = useState("0");
  const [newConnection, setNewConnection] = useState("0");
  const [remainingAmount, setRemainingAmount] = useState("0");
  const [remainingCylinder, setRemainingCylinder] = useState("0");
  const [paymentType, setPaymentType] = useState("");
  const [cylinderQty, setCylinderQty] = useState("0");
  const [onlinePayments, setOnlinePayments] = useState("0");
  const [onlineExtraAmount, setOnlineExtraAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState("0");
  const [paidAmount, setPaidAmount] = useState(0);
  const [show, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [cylinder1, setCylinder1] = useState("0");
  const [cylpayment1, setCylpayment1] = useState("0");
  const [onlineEx1, setOnlineEx1] = useState("0");
  const [cylinder2, setCylinder2] = useState("0");
  const [cylpayment2, setCylpayment2] = useState("0");
  const [onlineEx2, setOnlineEx2] = useState("0");
  const [cylinder3, setCylinder3] = useState("0");
  const [cylpayment3, setCylpayment3] = useState("0");
  const [onlineEx3, setOnlineEx3] = useState("0");
  const delivery_Man_Name = [
    "Mahendra Singh",
    "Shubham Mali",
    "Dinesh Malviya",
    "Ranchod",
    "Ishwar",
    "Raghu",
    "Kamal",
    "Vijay",
    "Luckky Rathore",
    "Dashrath",
    "Sangram Singh",
    "Sajay Yadav",
    "Krishna",
    "Paven",
    "Manohar",
    "Rajesh Mama",
    "Bhaiyaa",
    "Rameshwar",
  ];

  const Equipment_name = [
    "14.2 KG Filled Cyl Domestic",
    "5 KG Filled Cyl Domestic",
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "10 KG Filled Cyl Composite",
    "45.5 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/addDelivery", {
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
      });
      alert(res.data.message);
    } catch (err) {
      alert("Failed to save agent.", err.message);
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
      setPaidAmount("");
    setCylinder1(0);
    setCylpayment1(0);
    setOnlineEx1(0);
    setCylinder2(0);
    setCylpayment2(0);
    setOnlineEx2(0);
    setCylinder3(0);
    setCylpayment3(0);
    setOnlineEx3(0);
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
  useEffect(() => {
    if (!equipment) return;

    const fetchPrice = async () => {
      try {
        const res = await axios.get("http://localhost:4001/addratelist");
        const rateList = [...res.data].reverse();

        console.log("Full Rate List:", rateList);

        const latestValidRate = rateList.find(
          (item) => item.equipment === equipment && item.validTo >= today
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
    fetchPrice();
  }, [equipment]);

  useEffect(() => {
    if (!currentRate) return;
    const totals = Number(refill) * Number(currentRate);
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
    const finalPaid = afterCyl3 - Number(onlineEx3);

    setTotalAmount(totals);
    setOnlinePayments(onlineCylAmount);
    setCylpayment1(cyl1Amount);
    setCylpayment2(cyl2Amount);
    setCylpayment3(cyl3Amount);
    setPaidAmount(finalPaid);
  }, [
    refill,
    cylinderQty,
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

  return (
    <div className="refill settion p-3 rounded-3  border-warning border-3">
      <span className="fs-5 fw-semibold">Refill</span>
      <form onSubmit={handleSubmit}>
        <div className="box-body row">
          <div className="form-group col-md-3">
            <label>Valid To</label>
            <input
              type="date"
              name="validTo"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Current Rate</label>
            <input
              type="text"
              name="currentRate"
              value={currentRate}
              className="form-control"
              disabled
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
              {delivery_Man_Name.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
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
                <option key={idx} value={item}>
                  {item}
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
            />
          </div>

          <div className="form-group col-md-2">
            <label>New Connection</label>
            <input
              type="number"
              name="newConnection"
              value={newConnection && "0"}
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
                  <label>Payment Type </label>
                  <select name="paymentType1">
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
                  <label>Cyl Payment Amount</label>
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
                  <select name="paymentType1">
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
                  <select name="paymentType1">
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
              value={paidAmount}
              readOnly
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
