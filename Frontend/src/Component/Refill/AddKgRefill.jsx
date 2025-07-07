import axios from "../AxiosConfig";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddKgRefill() {
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
  const [KgRefill_List, setKgRefill_List] = useState([]);
  const [consumer, setConsumer] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;

  const Equipment_name = [
    "19 KG Filled Cyl CM",
    "5 KG Filled Cyl CM FTL POS",
    "47.5 KG Filled Cyl",
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
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/kgrefilllist");
      setKgRefill_List(res.data);
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
    if (id && editData) {
      console.log(editData);
      setConsumerName(editData.consumerName),
        setCurrentRate(editData.currentRate),
        setDeliveryMan(editData.deliveryMan),
        setDiscountRate(editData.discountRate),
        setEmptyBalance(editData.emptyBalance),
        setEmptyRefill(editData.emptyRefill),
        setEquipment(editData.equipment),
        setRemainingAmountBalance(editData.remainingAmountBalance),
        setOldAmountBalance(editData.oldAmountBalance),
        setRemarks(editData.remarks),
        setRefill(editData.refill),
        setDiscount(editData.discount),
        setPaymentReceived(editData.paymentReceived),
        setTotalAmount(editData.totalAmount);
    }
  }, [equipment, id, editData]);
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
  function Edithandle(id, data) {
    navigate(`/kgrefill/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const valid = confirm("Delete kg Refill Delivery");
    if (valid) {
      try {
       await axios.delete(`/deletekgrefill/${id}`);

        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      await axios.put(`/updatekgrefill/${id}`, {
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
        update_ty: "U",
      });
      alert("Update Data");
      fetchEmployees();
    } else {
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
          alert("Data Submit", res.data.message);
          fetchEmployees();
        })
        .catch((err) => err);
    }
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
    <div className="addkgrefill allworking  boxdesign">
      <span className="fs-5 fw-semibold">Add 19 KG Refill</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold ">Add 19 KG Refill</span>
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

      <div className="boxdesign h-auto mt-3 p-2  bg-light rounded-3 border-warning border-3 shadow-sm bg-white">
        <span className="fs-6 fw-semibold px-2">Refill List</span>
        <div className="my-3 px-2 d-flex flex-wrap justify-content-md-between justify-content-center align-items-center ">
          <input
            type="text"
            placeholder="Search...."
            style={{ maxWidth: "180px" }}
          />
          <div></div>
        </div>
        <div className="table-responsive px-2 pb-2">
          <table className="table table-striped " style={{ fontSize: "14px " }}>
            <thead className="table-secondary">
              <tr style={{ verticalAlign: "top", textAlign: "center" }}>
                <th>Consumer Name</th>
                <th>EQ Name</th>
                <th>DMan Name</th>
                <th>Refill</th>
                <th>Empty Received</th>

                <th>Amount Balance</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {KgRefill_List.length > 0 ? (
                KgRefill_List.map((item, index) => (
                  <tr key={index}>
                    <td>{item.consumerName}</td>
                    <td>{item.equipment}</td>
                    <td>{item.deliveryMan}</td>
                    <td>{item.refill}</td>
                    <td>{item.emptyRefill}</td>
                    <td>{item.totalAmount}</td>
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
                  <td colSpan={10} className="text-center align-middle">
                    <div className="text-center py-3">
                      <span className="text-warning">
                        No data available in table
                      </span>
                      <br />
                      <img src="govind.jpg" alt="No data" className="my-4" />
                      <br />
                      <span className="text-success">
                        Add new record or search with different criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={10}>
                  <span className="text-muted small">{`Records : 1 to ${KgRefill_List.length} to  ${KgRefill_List.length}`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddKgRefill;
