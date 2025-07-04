import axios from "axios";
import React, { useState, useEffect } from "react";

function Kgrefill() {
  const [consumerName, setConsumerName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [refill, setRefill] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discount,setDiscount] = useState("0");
  const [emptyRefill, setEmptyRefill] = useState("");
  const [paymentReceived, setPaymentReceived] = useState("0");
  const [totalAmount, setTotalAmount] = useState("0");
  const [emptyBalance, setEmptyBalance] = useState("0");
  const [oldAmountBalance, setOldAmountBalance] = useState("0");
  const [remainingAmountBalance, setRemainingAmountBalance] = useState("");
  const [remarks, setRemarks] = useState("");
  
  const Equipment_name = [
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "45 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];

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

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("/api/addkgrefill", {
        consumerName,
        equipment,
        deliveryMan,
        currentRate,
        refill,
        discountRate,
        discount,
        emptyRefill,
        paymentReceived,
        totalAmount,
        emptyBalance,
        oldAmountBalance,
        remainingAmountBalance,
        remarks,
      })
      .then((res) => {
        alert("Data Submit", res.data.message);
        fetchEmployees();
      })
      .catch((err) => console.log(err));
        setConsumerName(""),setCurrentRate(""),setDeliveryMan(""),setDiscountRate(""),setEmptyBalance(""),setEmptyRefill(""),setEquipment(""),setRemainingAmountBalance(""),setOldAmountBalance(""),setRemarks(""),setRefill(""),setDiscount(""),setPaymentReceived(""),setTotalAmount("")
  }

  return (
    <div className="kgrefill settion p-3 rounded-3 border-warning border-3">
      <span className="fs-5 fw-semibold">19 Kg Refill</span>
      <form onSubmit={handleSubmit}>
        <div className="box-body row mt-3">
          <div className="form-group col-md-3">
            <label>Consumer Name</label>
            <input
              type="text"
              name="consumerName"
              value={consumerName}
              onChange={(e) => setConsumerName(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Equipment Name</label>
            <select
              name="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              required
            >
              <option value="">Select</option>
              {Equipment_name.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label>Delivery Man Name</label>
            <select
              name="deliveryMan"
              value={deliveryMan}
              onChange={(e) => setDeliveryMan(e.target.value)}
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
            <label>Current Rate</label>
            <input
              type="number"
              name="currentRate"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Refill</label>
            <input
              type="text"
              name="refill"
              value={refill}
              onChange={(e) => setRefill(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Discount Rate</label>
            <input
              type="number"
              name="discountRate"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Discount</label>
            <input
              type="text"
              name="discount"
              value={discount}
              readOnly
              disabled
            />
          </div>

          <div className="form-group col-md-3">
            <label>Empty Refill Received</label>
            <input
              type="text"
              name="emptyRefill"
              value={emptyRefill}
              onChange={(e) => setEmptyRefill(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Payment Received</label>
            <input
              type="text"
              name="paymentReceived"
              value={paymentReceived}
              onChange={(e) => setPaymentReceived(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Total Amount</label>
            <input
              type="text"
              name="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Empty Balance</label>
            <input
              type="number"
              name="emptyBalance"
              value={emptyBalance}
              onChange={(e) => setEmptyBalance(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Old Amount Balance</label>
            <input
              type="number"
              name="oldAmountBalance"
              value={oldAmountBalance}
              onChange={(e) => setOldAmountBalance(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Remaining Amount Balance</label>
            <input
              type="number"
              name="remainingAmountBalance"
              value={remainingAmountBalance}
              onChange={(e) => setRemainingAmountBalance(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Remarks</label>
            <input
              type="text"
              name="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <div className="text-end my-2">
          <button className="btn btn-dark btn-sm px-3">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Kgrefill;
