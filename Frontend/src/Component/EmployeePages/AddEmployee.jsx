import React, { useEffect, useState } from "react";
import "../Allinone/Pages/Refill.css";
import axios from "../AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
function AddEmployee() {
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [licence, setLicence] = useState("");
  const [vchNo, setVchNo] = useState("");
  const [advance, setAdvance] = useState("");
  const [deposit, setDeposit] = useState("");
  const [discount, setDiscount] = useState("");
  const times = new Date().toLocaleTimeString();
  const location = useLocation();
  const editId = location.state?.id;

  useEffect(() => {
    if (editId) {
      axios.get(`/employee/${editId}`).then((res) => {
        const result = res.data;
        setAadhar(result.aadhar),
          setAddress(result.address),
          setAddress2(result.address2),
          setAddress3(result.address3),
          setAdvance(result.advance),
          setCity(result.city),
          setDeposit(result.deposit),
          setDiscount(result.discount),
          setDistrict(result.district),
          setLicence(result.licence),
          setMobile(result.mobile),
          setName(result.name),
          setSalaryAmount(result.salaryAmount),
          setSalaryType(result.salaryType),
          setState(result.state),
          setUserType(result.userType),
          setVchNo(result.vchNo);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/employee/${editId}`, {
        userType,
        name,
        mobile,
        salaryType,
        salaryAmount,
        address,
        address2,
        address3,
        city,
        district,
        state,
        aadhar,
        licence,
        vchNo,
        advance,
        deposit,
        discount,
        update_ty: "U",
      });
      alert("Updated Successfully");
    } else {
      axios
        .post("/addEmployee", {
          userType,
          name,
          mobile,
          salaryType,
          salaryAmount,
          address,
          address2,
          address3,
          city,
          district,
          state,
          aadhar,
          licence,
          vchNo,
          advance,
          deposit,
          discount,
          update_ty: "A",
          times,
        })
        .then((res) => alert(res.data.message))
        .catch((err) => err);
    }
    setAadhar(""),
      setAddress(""),
      setAddress2(""),
      setAddress3(""),
      setAdvance(""),
      setCity(""),
      setDeposit(""),
      setDiscount(""),
      setDistrict(""),
      setLicence(""),
      setMobile(""),
      setName(""),
      setSalaryAmount(""),
      setSalaryType(""),
      setState(""),
      setUserType(""),
      setVchNo("");
  };
  return (
    <div className="addEmployee boxdesign">
      <span className="fs-4 fw-semibold">Employee</span>
      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold ">
          {editId ? "Update" : "Add"} Employee
        </span>
        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-md-3 mb-3">
            <label className="form-label">User Type</label>
            <select
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option>Select</option>
              <option value="Delivery Man">Delivery Man</option>
              <option value="Staff">Staff</option>
              <option value="Vendor">Vendor</option>
              <option value="Consumer">Consumer</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="number"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Salary Type</label>
            <select
              name="salaryType"
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option>Select</option>
              <option value="Day Wise">Day Wise</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Salary Amount</label>
            <input
              type="number"
              name="salaryAmount"
              value={salaryAmount}
              onChange={(e) => setSalaryAmount(e.target.value)}
              placeholder="Enter Your Salary"
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Address 2</label>

            <input
              type="text"
              name="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Enter Your Address"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Address 3</label>
            <input
              type="text"
              name="address3"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              placeholder="Enter Your Address"
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter Your City"
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">District</label>
            <input
              type="text"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter Your District"
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter Your State"
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Aadhar</label>
            <input
              type="number"
              name="aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              placeholder="************"
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Driver Licence</label>
            <input
              type="text"
              name="licence"
              value={licence}
              onChange={(e) => setLicence(e.target.value)}
              placeholder="*********"
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">VCH No.</label>
            <input
              type="text"
              name="vchNo"
              value={vchNo}
              onChange={(e) => setVchNo(e.target.value)}
              placeholder="**********"
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Advance</label>
            <input
              type="text"
              name="advance"
              value={advance}
              onChange={(e) => setAdvance(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Deposit</label>
            <input
              type="number"
              name="deposit"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Discount</label>
            <input
              type="number"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="text-end mt-2">
            <button type="submit" className="btn btn-dark btn-sm px-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
