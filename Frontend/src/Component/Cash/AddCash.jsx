import axios from "../AxiosConfig";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddCash() {
  const times = new Date().toLocaleTimeString();
  const [search, setSearch] = useState("");
  const [a2000, setA2000] = useState("0");
  const [a500, setA500] = useState(0);
  const [a200, setA200] = useState(0);
  const [a100, setA100] = useState(0);
  const [a50, setA50] = useState(0);
  const [a20, setA20] = useState(0);
  const [a10, setA10] = useState(0);
  const [cashList, setCashList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;
  useEffect(() => {
    setTotalAmount(
      a2000 * 2000 +
        a500 * 500 +
        a200 * 200 +
        a100 * 100 +
        a50 * 50 +
        a20 * 20 +
        a10 * 10
    );
  }, [a2000, a500, a200, a100, a50, a20, a10]);
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/cashlist");
      setCashList(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };

  useEffect(() => {
    if (id && editData) {
      setTotalAmount(editData.totalAmount);
    }
    fetchEmployees();
  }, [id, editData]);

  function Edithandle(id, data) {
    navigate(`/app/cash/${id}`, { state: { empData: data } });
  }

  async function Deletehandle(id) {
    const valid = confirm("Delete Cash Delivery");
    if (valid) {
      try {
        const res = await axios.delete(`/deletecash/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err.message);
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (totalAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (id) {
      await axios.put(`/updatecash/${id}`, {
        totalAmount,
        a2000,
        a500,
        a200,
        a100,
        a50,
        a20,
        a10,
        update_ty: "U",
      });
    } else {
      await axios
        .post("/addcash", {
          totalAmount,
          a2000,
          a500,
          a200,
          a100,
          a50,
          a20,
          a10,
          update_ty: "A",
          times,
        })
        .then((res) => {
          alert("Data Submit", res.data.message);
          fetchEmployees();
        })
        .catch((err) => err.message);
    }
    setTotalAmount(0), setA10(0), setA20(0), setA50(0), setA100(0);
    setA200(0), setA500(0), setA2000(0);
  }
  return (
    <div className="addcash allworking boxdesign">
      <span className="fs-4 fw-semibold">Cash Entry</span>
      <div className="d-md-flex mt-2 gap-4 flex-wrap">
        <div className="headdiv px-2 settion py-2 bg-light rounded-2  border-warning border-3 shadow-sm">
          <span className="fs-6 fw-semibold ">Add Cash</span>
          <form onSubmit={handleSubmit}>
            <table width="100%" className="table table-striped pt-2 table1">
              <tbody>
                <tr>
                  <td width="30%">2000</td>
                  <td width="40%">
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      value={a2000}
                      onChange={(e) => setA2000(Number(e.target.value))}
                    />
                  </td>
                  <td className="text-end">{a2000 * 2000}</td>
                </tr>
                <tr>
                  <td width="30%">500</td>
                  <td>
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      value={a500}
                      onChange={(e) => setA500(Number(e.target.value))}
                    />
                  </td>
                  <td>{a500 * 500}</td>
                </tr>
                <tr>
                  <td>200</td>
                  <td>
                    <input
                      type="number"
                      value={a200}
                      style={{ width: "100px" }}
                      onChange={(e) => setA200(Number(e.target.value))}
                    />
                  </td>
                  <td>{a200 * 200}</td>
                </tr>
                <tr>
                  <td>100</td>
                  <td>
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      value={a100}
                      onChange={(e) => setA100(Number(e.target.value))}
                    />
                  </td>
                  <td>{a100 * 100}</td>
                </tr>
                <tr>
                  <td>50</td>
                  <td>
                    <input
                      type="number"
                      value={a50}
                      style={{ width: "100px" }}
                      onChange={(e) => setA50(Number(e.target.value))}
                    />
                  </td>
                  <td>{a50 * 50}</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>
                    <input
                      type="number"
                      value={a20}
                      style={{ width: "100px" }}
                      onChange={(e) => setA20(Number(e.target.value))}
                    />
                  </td>
                  <td>{a20 * 20}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>
                    <input
                      type="number"
                      value={a10}
                      style={{ width: "100px" }}
                      onChange={(e) => setA10(Number(e.target.value))}
                    />
                  </td>
                  <td>{a10 * 10}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Total:</th>
                  <th className="text-end">{totalAmount}</th>
                </tr>
              </tbody>
            </table>

            <div className="text-end my-2">
              <button type="submit" className="btn btn-dark btn-sm px-3">
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="flex-fill settion p-3 bg-light rounded-2 border-top border-warning border-3 shadow-sm">
          <span className="fs-6 fw-semibold">Cash List</span>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <input
              className="me-2"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "180px" }}
            />
            <div></div>
          </div>

          <div className="table-responsive my-2">
            <table className="table table-striped" style={{ fontSize: "13px" }}>
              <thead className="table-secondary">
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cashList.length > 0 ? (
                  cashList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date.split("T")[0]}</td>
                      <td>{item.totalAmount}</td>
                      <td>
                        <div className="divbtn fs-5 ">
                          <FaEdit
                            className="me-2"
                            onClick={() => Edithandle(item._id, item)}
                          />
                          <FaDeleteLeft
                            onClick={() => Deletehandle(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center align-middle">
                      <div className="text-center py-3">
                        <span className="text-warning">
                          No data available in table
                        </span>
                        <br />
                        <img src="ss" alt="No data" className="my-4" />
                        <br />
                        <span className="text-success">
                          Add new record or search with different criteria.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCash;
