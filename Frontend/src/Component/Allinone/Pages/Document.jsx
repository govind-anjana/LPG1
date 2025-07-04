import axios from 'axios';
import React, { useState } from 'react';

function DocumentForm() {
  const [connection, setConnection] = useState("");
  const [equipment, setEquipment] = useState("");
  const [itemType, setItemType] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [consumerNo, setConsumerNo] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [cylQty, setCylQty] = useState("");
  const [prQty, setPrQty] = useState("");
  const [cylDeposit, setCylDeposit] = useState("");
  const [prDeposit, setPrDeposit] = useState("");
  const [advanceRecover, setAdvanceRecover] = useState("");
  const [docCharges, setDocCharges] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [remarks, setRemarks] = useState("");

       
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
        amountPaid,
        remarks,
      });

      alert(res.data.message);
    } catch (err) {
      alert("Failed to save agent.", err.message);
    }
    setConnection(""),setEquipment(""),setItemType(),setAdvanceRecover(""),setAmountPaid(""),setConsumerName(""),setConsumerNo(""),setCylDeposit(""),setCylQty(""),setDeliveryMan(""),setDocCharges(""),setPrDeposit(),setPrQty(""),setRemarks()
  };

  return (
    <div className="document settion p-3 rounded-3 border-top border-warning border-3">
      <span className="fs-5 fw-semibold">Document</span>
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
              className="form-select"
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
                className="form-select"
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
                  className="form-select"
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
                  className="form-select"
                >
                  <option value="">Select</option>
                  {delivery_Man_Name.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Consumer No</label>
                <input
                  type="number"
                  name="consumerNo"
                  value={consumerNo}
                  onChange={(e) => setConsumerNo(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Consumer Name</label>
                <input
                  type="text"
                  name="consumerName"
                  value={consumerName}
                  onChange={(e) => setConsumerName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Cylinder QTY</label>
                <input
                  type="number"
                  name="cylQty"
                  value={cylQty}
                  onChange={(e) => setCylQty(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">PR QTY</label>
                <input
                  type="number"
                  name="prQty"
                  value={prQty}
                  onChange={(e) => setPrQty(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Cyl Deposit Amount</label>
                <input
                  type="number"
                  name="cylDeposit"
                  value={cylDeposit}
                  onChange={(e) => setCylDeposit(e.target.value)}
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
                <label className="form-label">Document Charges</label>
                <input
                  type="number"
                  name="docCharges"
                  value={docCharges}
                  onChange={(e) => setDocCharges(e.target.value)}
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

              <div className="col-md-3">
                <label className="form-label">Final Amount</label>
                <input
                  type="number"
                  name="finalAmount"
                  value=""
                  readOnly
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
            </>
          )}
          <div className="text-end my-2">
            <button type="submit" className="btn btn-dark btn-sm px-3">
              Save
            </button>
          </div>
        </form>
    </div>
  );
}

export default DocumentForm;
