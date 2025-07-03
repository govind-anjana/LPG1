import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function AddItemDocument() {
  const [connection, setConnection] = useState("");
  const [equipment, setEquipment] = useState("");
  const [itemType, setItemType] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [consumerNo, setConsumerNo] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [cylQty, setCylQty] = useState("");
  const [prQty, setPrQty] = useState("0");
  const [cylDeposit, setCylDeposit] = useState("");
  const [prDeposit, setPrDeposit] = useState("");
  const [advanceRecover, setAdvanceRecover] = useState("");
  const [docCharges, setDocCharges] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [remarks, setRemarks] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalamount, setTotalAmount] = useState(0);
  const Equipment_name = {
    domestic: [
      "14.2 KG Filled Cyl Domestic",
      "5 KG Filled Cyl Domestic",
      "19 KG Filled Cyl CM",
      "5 KG Filled Cyl CM FTL POS",
      "10 KG Filled Cyl Composite",
      "45 KG Filled Cyl",
      "LPG Pressure Regulator Sound",
    ],
    commercial: ["19 KG Filled Cyl CM", "45 KG Filled Cyl"],
  };

  const item_type = {
    domestic: ["SV", "TV", "TTV", "TSV", "TCRV", "INTV"],
    commercial: ["SV", "TV", "INTV"],
  };
  const PromotionType = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "SBC WITH HOTPLATE",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/adddocument", {
        connection,
        equipment,
        itemType,
        deliveryMan,
        consumerNo,
        consumerName,
        cylQty,
        prQty,
        cylDeposit,
        prDeposit,
        advanceRecover,
        docCharges,
        amountPaid,
        remarks,
      });
      setConnection(""),
        setEquipment(""),
        setItemType(),
        setAdvanceRecover(""),
        setAmountPaid(""),
        setConsumerName(""),
        setConsumerNo(""),
        setCylDeposit(""),
        setCylQty(""),
        setDeliveryMan(""),
        setDocCharges(""),
        setPrDeposit(),
        setPrQty(""),
        setRemarks();

      alert(res.data.message);
    } catch (err) {
      alert("Failed to save agent.", err.message);
    }
  };
  useEffect(() => {
    if (!promotionType) return;
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:4001/promotionlist");
        const rateList = [...res.data].reverse();

        // console.log("Full Rate List:", rateList);

        const latestValidRate = rateList.find(
          (item) => item.promotion == promotionType
        );
        // console.log(latestValidRate)
        if (latestValidRate) {
          setFinalAmount(latestValidRate.rate);
          setCylQty(latestValidRate.qty);
          setPrQty(1);
          // setCurrentRate(latestValidRate.totalRsp);
        } else {
          setPromotionType("");
          setFinalAmount(0);
          setCylQty(0);
          setPrQty(0);
          alert("Please Add Promotion Rate.");
        }
      } catch (err) {
        console.error("Error fetching rate list:", err.message);
      }
    };
    fetchdata();
  }, [promotionType]);

  useEffect(() => {
    if (!itemType) return;
    setFinalAmount(0);
    if (itemType == "TV") {
      setCylDeposit(2200);
      setPrDeposit(250);
    }
  }, [itemType]);

  return (
    <div className="allworking boxdesign">
      <span className="fs-5 fw-semibold">Document</span>
      <div className="settion mt-2 p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold px-1">Add Document</span>
        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label className="form-label">Connection Type</label>
            <select
              name="connection"
              value={connection}
              onChange={(e) => {
                setConnection(e.target.value);
                setEquipment("");
              }}
              className=""
              required
            >
              <option value="">Select</option>
              <option value="domestic">Domestic</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {connection && (
            <div className="col-md-3">
              <label className="form-label">Equipment Name</label>
              <select
                name="equipment"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className=""
              >
                <option value="">Select</option>
                {Equipment_name[connection].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {equipment && (
            <>
              <div className="col-md-3">
                <label className="form-label">Item Type</label>
                <select
                  name="itemType"
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                >
                  <option value="">Select</option>
                  {item_type[connection].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Delivery Man Name</label>
                <select
                  name="deliveryMan"
                  value={deliveryMan}
                  onChange={(e) => setDeliveryMan(e.target.value)}
                  className=""
                  required
                >
                  <option value="">Select</option>

                  {delivery_Man_Name.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">Consumer No</label>
                <input
                  type="number"
                  name="consumerNo"
                  value={consumerNo}
                  onChange={(e) => setConsumerNo(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Consumer Name</label>
                <input
                  type="text"
                  name="consumerName"
                  value={consumerName}
                  onChange={(e) => setConsumerName(e.target.value)}
                  required
                />
              </div>
              {connection == "domestic" && itemType == "SV" && (
                <>
                  <div className="col-md-3">
                    <label className="form-label">Promotion Type</label>
                    <select onChange={(e) => setPromotionType(e.target.value)}>
                      <option value="">Select</option>
                      {PromotionType.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">PR Issued</label>
                    <select>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">PT Issued</label>
                    <select>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">RT Model Name</label>
                    <select>
                      <option>Select</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Padding Amount</label>
                    <input type="number" name="paddingamount" />
                  </div>
                </>
              )}

              {connection == "domestic" && (
                <div className="row">
                  <div className="col-md-3">
                    <label className="form-label">Cylinder QTY</label>
                    <input
                      type="number"
                      name="cylQty"
                      value={cylQty}
                      disabled
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">PR QTY</label>
                    <input
                      type="number"
                      name="prQty"
                      value={prQty}
                      disabled
                      className="form-control"
                    />
                  </div>
                {
                  (itemType=="SV" || itemType=="INTV") && (
                     <div className="col-md-3">
                      <label className="form-label">Total Amount</label>
                      <input
                        type="number"
                        name="totalamount"
                        value={totalamount}
                        disabled
                        className="form-control"
                      />
                    </div>
                  )
                }
                </div>
              )}

              {connection == "domestic" &&
                (itemType == "SV" || itemType == "INTV") && (
                  <>
                    
                    <div className="col-md-3">
                      <label className="form-label">Payment Type</label>

                      <select>
                        <option>Select</option>
                        <option>Online</option>
                        <option>PayTm</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Discount Amount</label>
                      <input type="number" className="form-control" />
                    </div>
                  </>
                )}
              {(itemType == "TV" || connection == "commercial") && (
                <>
                  <div className="col-md-3">
                    <label className="form-label">Cyl Deposit Amount</label>
                    <input
                      type="number"
                      name="cylDeposit"
                      value={cylDeposit}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">PR Deposit Amount</label>
                    <input
                      type="number"
                      name="prDeposit"
                      value={prDeposit}
                      onChange={(e) => setPrDeposit(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Advance Recover</label>
                    <input
                      type="number"
                      name="advanceRecover"
                      value={advanceRecover}
                      onChange={(e) => setAdvanceRecover(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Amount Paid</label>
                    <input
                      type="text"
                      name="amountPaid"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </>
              )}
              {connection == "domestic" && itemType == "TCRV" && (
                <div className="col-md-3">
                  <label className="form-label">Total Amount</label>
                  <input type="number" />
                </div>
              )}
              {connection == "domestic" &&
                (itemType == "TTV" ||
                  itemType == "TSV" ||
                  itemType == "TCRV") && (
                  <div className="col-md-3">
                    <label className="form-label">Document Charges</label>
                    <input type="number" />
                  </div>
                )}
              {connection == "domestic" && itemType == "TCRV" && (
                <>
                  <div className="col-md-3">
                    <label className="form-label">PR No</label>
                    <input type="number" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">PR Make</label>
                    <input type="number" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Replecement Type </label>
                    <select>
                      <option value="free">Free</option>
                      <option value="Tarif Rate">Tarif Rate</option>
                      <option value="Penality Rate">Penality Rate</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Replecement Rate</label>
                    <input type="number" />
                  </div>
                </>
              )}
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label">Final Amount</label>
                  <input
                    type="number"
                    name="finalAmount"
                    value={finalAmount}
                    disabled
                    className="form-control"
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Remarks</label>
                  <input
                    type="text"
                    name="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </>
          )}
          <div className="text-end my-2">
            <button type="submit" className="btn btn-dark btn-sm px-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemDocument;
