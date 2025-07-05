import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddItemDocument() {
  const times = new Date().toLocaleTimeString();
  const [connection, setConnection] = useState("");
  const [equipment, setEquipment] = useState("");
  const [itemType, setItemType] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [consumerNo, setConsumerNo] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [cylQty, setCylQty] = useState("0");
  const [prQty, setPrQty] = useState("0");
  const [cylDeposit, setCylDeposit] = useState("");
  const [prDeposit, setPrDeposit] = useState("");
  const [advanceRecover, setAdvanceRecover] = useState("");
  const [docCharges, setDocCharges] = useState("");
  const [paddingA, setPaddingA] = useState("0");
  const [paymentT, setPaymentT] = useState("");
  const [discountA, setDiscountA] = useState("0");
  const [pr, setPr] = useState("0");
  const [prm, setPrm] = useState("0");
  const [replace, setReplace] = useState("");
  const [replaceRate, setReplaceRate] = useState("0");
  const [amountPaid, setAmountPaid] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalamount, setTotalAmount] = useState(0);
  const navigator = useNavigate("");
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;

  useEffect(() => {
    if (id && editData) {
      editData;
      setConnection(editData.connection);
      setEquipment(editData.equipment);
      setItemType(editData.itemType), setDeliveryMan(editData.deliveryMan);
      setConsumerName(editData.consumerName),
        setConsumerNo(editData.consumerNo);
      setAdvanceRecover(editData.advanceRecover),
        setAmountPaid(editData.amountPaid);
      setCylDeposit(editData.cylDeposit),
        setCylQty(editData.cylQty),
        setDocCharges(editData.docCharges),
        setPrDeposit(editData.prDeposit),
        setPrQty(editData.prQty),
        setPaddingA(editData.paddingA);
      setPaymentT(editData.paymentT);
      setDiscountA(editData.discountA);
      setPr(editData.pr);
      setPrm(editData.prm);
      setRemarks(editData.remarks);
      setReplace(editData.replace);
      setReplaceRate(editData.replaceRate);
      setAmountPaid(editData.amountPaid);
      setPromotionType(editData.promotionType);
      setDocCharges(editData.docCharges);
      setFinalAmount(editData.finalAmount);
      setTotalAmount(editData.totalamount);
    }
  }, [id, editData]);
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
  const PromotionList = [
    "SBC WITH HOTPLATE",
    "SBC WITH OUT HOTPLATE",
    "DBC WITH HOTPLATE",
    "DBC WITH OUT HOTPLATE",
    "DBC",
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
    if (id) {
      const res1 = await axios.put(`/api/updatedocument/${id}`, {
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
        paddingA,
        paymentT,
        discountA,
        pr,
        prm,
        replace,
        replaceRate,
        amountPaid,
        remarks,
        promotionType,
        finalAmount,
        totalamount,
        update_ty: "U",
      });
      alert("update Document");
    } else {
      try {
        const res = await axios.post("/api/adddocument", {
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
          paddingA,
          paymentT,
          discountA,
          pr,
          prm,
          replace,
          replaceRate,
          amountPaid,
          remarks,
          promotionType,
          finalAmount,
          totalamount,
          times,
          update_ty: "A",
        });
        setConnection(""),
          setEquipment(""),
          setItemType(""),
          setAdvanceRecover(""),
          setAmountPaid(""),
          setConsumerName(""),
          setConsumerNo(""),
          setCylDeposit(""),
          setCylQty(""),
          setDeliveryMan(""),
          setDocCharges(""),
          setPrDeposit(""),
          setPrQty(""),
          setRemarks("");
        setPaddingA("");
        setPaymentT("");
        alert(res.data.message);
      } catch (err) {
        alert("Failed to save agent.", err.message);
      }
    }
    navigator("/document");
  };
  async function fetchModel() {
    const models = await axios.get("/api/nfrlist");
    models;
  }
  useEffect(() => {
    if (!promotionType) return;
    const fetchdata = async () => {
      try {
        const res = await axios.get("/api/promotionlist");
        const rateList = [...res.data].reverse();

        const latestValidRate = rateList.find(
          (item) => item.promotion == promotionType
        );
        // (latestValidRate)
        if (latestValidRate) {
          setFinalAmount(latestValidRate.rate);
          setTotalAmount(latestValidRate.rate);
          setCylQty(latestValidRate.qty);
          setPrQty(1);
        } else {
          setPromotionType("");
          setFinalAmount(0);
          setTotalAmount(0);
          setCylQty(0);
          setPrQty(0);
          setDiscountA(0);
          alert("Please Add Promotion Rate.");
        }
      } catch (err) {
        console.error("Error fetching rate list:", err.message);
      }
    };
    fetchdata();
    fetchModel();
  }, [promotionType]);

  useEffect(() => {
    if (!itemType) return;
    setFinalAmount(0);
    setTotalAmount(0);
    setCylQty(0);
    setPrQty(0);
    setPaddingA(0);
    setCylDeposit(0);
    setPrDeposit(0);
    if (itemType == "TV") {
      setCylDeposit(2200);
      setPrDeposit(250);
    }
  }, [itemType]);
  useEffect(() => {
    const res1 = cylDeposit + prDeposit;
    const adcharg = res1 - advanceRecover;
    const aa = adcharg - docCharges;

    setFinalAmount(aa);
    setAmountPaid(aa);
  }, [docCharges, advanceRecover]);

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
                  required
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
                    <select
                      value={promotionType}
                      onChange={(e) => setPromotionType(e.target.value)}
                    >
                      <option value="">Select</option>
                      {PromotionList.map((item, index) => (
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
                    <input
                      type="number"
                      value={paddingA}
                      onChange={(e) => setPaddingA(e.target.value)}
                      name="paddingA"
                    />
                  </div>
                </>
              )}

              <div className="row">
                {connection == "domestic" && (
                  <>
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
                      />
                    </div>
                    {(itemType == "SV" || itemType == "INTV") && (
                      <div className="col-md-3">
                        <label className="form-label">Total Amount</label>
                        <input
                          type="number"
                          name="totalamount"
                          value={totalamount}
                          disabled
                        />
                      </div>
                    )}
                  </>
                )}

                {connection == "domestic" &&
                  (itemType == "SV" || itemType == "INTV") && (
                    <>
                      <div className="col-md-3">
                        <label className="form-label">Payment Type</label>

                        <select
                          value={paymentT}
                          onChange={(e) => setPaymentT(e.target.value)}
                        >
                          <option>Select</option>
                          <option>Online</option>
                          <option>PayTm</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Discount Amount</label>
                        <input
                          type="number"
                          value={discountA}
                          onChange={(e) => setDiscountA(e.target.value)}
                        />
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
                        onChange={(e) => setCylDeposit(e.target.value)}
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
                      <label className="form-label">Document Charges</label>
                      <input
                        type="number"
                        value={docCharges}
                        onChange={(e) => setDocCharges(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Amount Paid</label>
                      <input
                        type="number"
                        name="amountPaid"
                        value={amountPaid}
                        disabled
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
                      <input
                        type="number"
                        value={docCharges}
                        onChange={(e) => setDocCharges(e.target.value)}
                      />
                    </div>
                  )}
                {connection == "domestic" && itemType == "TCRV" && (
                  <>
                    <div className="col-md-3">
                      <label className="form-label">PR No</label>
                      <input
                        type="number"
                        value={pr}
                        onChange={(e) => setPr(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">PR Make</label>
                      <input
                        type="number"
                        value={prm}
                        onChange={(e) => setPrm(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Replecement Type </label>
                      <select value={replace} onChange={(e) => setReplace}>
                        <option value="free">Free</option>
                        <option value="Tarif Rate">Tarif Rate</option>
                        <option value="Penality Rate">Penality Rate</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Replecement Rate</label>
                      <input
                        type="number"
                        value={replaceRate}
                        onChange={(e) => setReplaceRate(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="row">
                  <div className="col-md-3">
                    <label className="form-label">Final Amount</label>
                    <input
                      type="number"
                      name="finalAmount"
                      value={finalAmount - discountA}
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
