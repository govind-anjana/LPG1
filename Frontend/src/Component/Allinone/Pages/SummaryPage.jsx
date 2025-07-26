import axios from '../../AxiosConfig';
import React, { useEffect, useState } from 'react'

function SummaryPage() {
  const [deliveryLog, setDeliveryLog] = useState([]);
  const [documentLog, setDocumentLog] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [cashData, setCashLog] = useState(null);
  const [totalSum,setTotalSum]=useState(0)
  // const [summary, setSummary] = useState({});
  // const [currRate, setCurrRate] = useState(0);
 
  const [today, setToday] = useState('');

   const denominations = [
    { key: 'a2000', label: 2000 },
    { key: 'a500', label: 500 },
    { key: 'a200', label: 200 },
    { key: 'a100', label: 100 },
    { key: 'a50', label: 50 },
    { key: 'a20', label: 20 },
    { key: 'a10', label: 10 }
  ];
  useEffect(() => {
    axios.get('/deliverylist').then(res => setDeliveryLog(res.data));
    axios.get('/documentlist').then(res => setDocumentLog(res.data));
    axios.get('/salelist').then(res => setSalesList(res.data));
    axios.get('/cashlist').then(res => setCashLog(res.data));
    // axios.get('/plantlist').then(res => setSummary(res.data));
    setToday(new Date().toLocaleDateString());
    
}, []);
useEffect(() => {
  let total = documentLog.reduce((acc, dd) => acc + (dd.totalamount ||0), 0);
  setTotalSum(total);
}, [documentLog]);
// console.log(totalSum)
const totals = deliveryLog.reduce(
  (acc, d) => {
    acc.clyqty += d.totalCylinder || 0;
    acc.refil += d.refill || 0;
    acc.new_cons += d.newConnection || 0;
    acc.dmanTotalPaid += d.paidAmount || 0;
    acc.totalAmount += d.totalAmount || 0;
    return acc;
  },
  { clyqty: 0, refil: 0, new_cons: 0, dmanTotalPaid: 0, totalAmount: 0 }
);
  

if (!cashData || cashData.length === 0) return <h4 className='text-center text-danger'>Loading or No Data</h4>;
  
  return (
     <div className="sales settion p-3 rounded-3  border-warning border-3">
     <h3 className="mb-3 text-center text-decoration-underline text-primary">LPG Daily Report</h3>
      <h5 className='text-primary text-center my-2'>Refill</h5>
      <div className="table-responsive px-2 pb-2">
       <table
        className="table table-striped "
        style={{ fontSize: '13px' }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>{today}</th>
            <th></th>
            <th>Rate</th>
            <th>{(totals.totalAmount)+totalSum}</th>
          </tr>
        </thead>
      </table>
</div>
      {deliveryLog.length > 0 ? (
        <div className="table-responsive px-2 pb-2">
        <table
          className="table table-striped "
          style={{ fontSize: '13px'}}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Send</th>
              <th>Refill</th>
              <th>New Connection</th>
              <th>Amt Received</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {deliveryLog.map((d, i) => (
              <tr key={i}>
                <td>{ d.dmanID}</td>
                <td>{d.totalCylinder}</td>
                <td>{d.refill}</td>
                <td>{d.newConnection}</td>
                <td>{ d.paidAmount}</td>
                <td>{d.totalAmount}</td>
              </tr>
            ))}
            
            <tr>
              <th>Total</th>
              <th>{totals.clyqty}</th>
              <th>{totals.refil}</th>
              <th>{totals.new_cons}</th>
              <th>{totals.dmanTotalPaid}</th>
              <th>{totals.totalAmount}</th>
            </tr>
          </tbody>
        </table>
        </div>
      ) : (
        <p className='text-danger text-center'>No deliveries found.</p>
      )}


    
      {documentLog.length > 0 && (
        <>
          <h5 className='text-primary text-center my-2'>Document Dues</h5>
           <div className="table-responsive px-2 pb-2">
          <table  className="table table-striped "
            style={{ fontSize: "13px " }}>
            <thead>
              <tr>
                <th>Particular</th>
                <th>Due Amount</th>
              </tr>
            </thead>
            <tbody>
              {documentLog.map((d, i) => {
                 {/* totalSum += d.totalAmount;
                 setTotalSum(totalSum) */}
                return(
                <tr key={i}>
                  <td>
                    2 N/C {d.consumerName} CLY {d.cylQty} ({d.deliveryMan})
                  </td>
                  <td>{d.totalamount}</td>
                </tr>
       ) })}
            </tbody>
          </table>
          </div>
        </>
      )}

      {/* Sales List */}
       {salesList.length > 0 && (
        <>
          <h5 className='text-primary text-center my-2'>Sales</h5>
           <div className="table-responsive px-2 pb-2">
          <table  className="table table-striped"
            style={{ fontSize: "13px "}}>
            <thead>
              <tr>
                <th>Sales Type</th>
                <th>Name</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesList.map((s, i) => (
                <tr key={i}>
                  <td>{s.conType}</td>
                  <td>{s.model}</td>
                  <td>{s.rate}</td>
                  <td>{s.qty}</td>
                  <td>{(s.rate)*(s.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}

     
     {cashData && (
        <>
        <h5 className='text-primary text-center my-2'>Cash Details</h5>
      {cashData.map((cashData, index) => (
        <div key={index} className="mb-4 table-responsive px-2 pb-2">
          <table className="table table-striped "
            style={{ fontSize: "13px " }}>
            <thead>
              <tr>
                <th>Note</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {denominations.map((den, idx) => {
                const qty = parseInt(cashData[den.key] ?? 0);
                return (
                  <tr key={idx}>
                    <td>{den.label}</td>
                    <td>{qty}</td>
                    <td>{qty * den.label}</td>
                  </tr>
                );
              })}
              <tr>
                <th>Total Amount</th>
                <td colSpan="2">{cashData.totalAmount}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td colSpan="2">{cashData.times || 'N/A'}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td colSpan="2">{cashData.update_ty === 'U' ? 'Updated' : 'Created'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
       
        </>
      )}

       {/* {summary && (
        <>
          <h4>14.2 KG Summary</h4>
          <table  className="table table-striped text-capitalize"
            style={{ fontSize: "12px ", borderCollapse: "inherit" }}>
            <tbody>
              <tr>
                <td><strong>Plant Received</strong></td>
                <td>{summary.ReDate}</td>
              </tr>
              <tr>
                <td><strong>Refill & NC</strong></td>
                <td>{summary.qty}</td>
              </tr>
              <tr>
                <td><strong>Defective</strong></td>
                <td>{summary.defective}</td>
              </tr>
              <tr>
                <td><strong>Today Closing</strong></td>
                <td>{summary.todayClosing}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}  */}
      </div>
  )
}

export default SummaryPage
