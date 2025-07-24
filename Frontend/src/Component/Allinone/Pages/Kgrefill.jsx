import DataContext from "../../../Context/DataContext";
import axios from "../../AxiosConfig";
import React, { useState, useEffect, useContext } from "react";

function Kgrefill() {
   const { employess,bool1,setBool1,alertM,setAlertM } = useContext(DataContext);
  const news = new Date();
  const times = news.toLocaleTimeString();
  const today = news.toISOString().split("T")[0];
  const [consumerName, setConsumerName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [refill, setRefill] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discount, setDiscount] = useState("0");
  const [emptyRefill, setEmptyRefill] = useState("");
  const [paymentReceived, setPaymentReceived] = useState("0");
  const [totalAmount, setTotalAmount] = useState("0");
  const [emptyBalance, setEmptyBalance] = useState("0");
  const [oldAmountBalance, setOldAmountBalance] = useState("0");
  const [remainingAmountBalance, setRemainingAmountBalance] = useState("");
  const [remarks, setRemarks] = useState("");
  const [consumer, setConsumer] = useState([]);
  

  const Equipment_name = [
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "47.5 KG Filled Cyl",
    "LPG Pressure Regulator Sound",
  ];


  const fetchEmployees = async () => {
    try {
      const res1 = await axios.get("/consumerlist");
      setConsumer(res1.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  function fetchapi() {
    if (!equipment) return;

    const fetchPrice = async () => {
      try {
        const res = await axios.get("/addratelist");
        const rateList = [...res.data].reverse();

        const latestValidRate = rateList.find(
          (item) => item.equipment == equipment && item.validTo >= today
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
  }
  useEffect(() => {
    fetchEmployees();
    fetchapi();
  }, [equipment]);
  useEffect(() => {
    const totals = currentRate * refill;
    const dis = refill * discountRate;
    const Totals1 = totals - discountRate;
    const netTotal = Totals1 - paymentReceived;
    setDiscount(dis);
    setEmptyRefill(refill);
    setTotalAmount(Totals1);
    setRemainingAmountBalance(netTotal);
  }, [refill, discountRate, paymentReceived]);
  
  async function handleSubmit(e) {
    e.preventDefault();
      setBool1(true);
      setAlertM("Kg Refill added successfully")
      await axios
        .post("/addkgrefill", {
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
          update_ty: "A",
          times,
        })
        .then((res) => {
         
          fetchEmployees();
        })
        .catch((err) => err);
    setConsumerName(""),
      setCurrentRate(""),
      setDeliveryMan(""),
      setDiscountRate(""),
      setEmptyBalance(""),
      setEmptyRefill(""),
      setEquipment(""),
      setRemainingAmountBalance(""),
      setOldAmountBalance(""),
      setRemarks(""),
      setRefill(""),
      setDiscount(""),
      setPaymentReceived(""),
      setTotalAmount("");
  }

  return (
    <div className="kgrefill settion p-3 rounded-3 border-warning border-3">
      <span className="fs-5 fw-semibold">19 Kg Refill</span>
       {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
      <form onSubmit={handleSubmit}>
          <div className="box-body row mt-3">
            <div className="form-group col-md-3">
              <label>Consumer Name</label>
              <select
                name="consumerName"
                value={consumerName}
                onChange={(e) => setConsumerName(e.target.value)}
              >
                <option value="">Select</option>
                {consumer.map((item, idx) => (
                  <option key={idx} value={item.consumerName}>
                    {item.consumerName}
                  </option>
                ))}
              </select>
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
               {employess.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
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
                disabled
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
                readOnly
                disabled
              />
            </div>

            <div className="form-group col-md-3">
              <label>Payment Received</label>
              <input
                type="number"
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
                disabled
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
