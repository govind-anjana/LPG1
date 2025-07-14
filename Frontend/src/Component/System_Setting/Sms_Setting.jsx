import React, { useState } from "react";
import msg from "../Images/msg91.png";
import click from "../Images/clickatell.png";
import twilio from "../Images/twilio.png";
import textlocal from "../Images/textlocal.png";
import smscountry from "../Images/sms-country.jpg";
import custom from "../Images/custom-sms.png";
import axios from "../AxiosConfig";
function Sms_Setting() {
  const [visibleDiv, setVisibleDiv] = useState("sms1");
  const [formData1, setformData1] = useState({
    agentName: "",
    password: "",
    apiid: "",
    status: "",
  });
  const [formData2, setformData2] = useState({
    account: "",
    token: "",
    mobile: "",
    status: "",
  });
  const [formData3, setformData3] = useState({
    key: "",
    id: "",
    status: "",
  });

  const [formData4, setformData4] = useState({
    username: "",
    haskkey: "",
    senderid: "",
    status: "",
  });
  const [formData5, setformData5] = useState({
    username: "",
    id: "",
    password: "",
    status: "",
  });
  const [formData6, setformData6] = useState({
    names: "",
    status: "",
  });
  const handelChange1 = (e) => {
    const { name, value } = e.target;
    setformData1((prev) => ({
      ...prev,
      [name]: value,
    }));
    setformData2((prev) => ({
      ...prev,
      [name]: value,
    }));
    setformData3((prev) => ({
      ...prev,
      [name]: value,
    }));
    setformData4((prev) => ({
      ...prev,
      [name]: value,
    }));
    setformData5((prev) => ({
      ...prev,
      [name]: value,
    }));
    setformData6((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelSubmit1 = async (e) => {
    e.preventDefault();
    await axios
      .post("/clickatellsms", formData1)
      .then((res) => alert(res.data.message))
      .catch((err) => err);

    alert(formData1.agentName);
    setformData1({
      agentName: "",
      password: "",
      apiid: "",
      status: "",
    });
  };
  const handelSubmit2 = (e) => {
    e.preventDefault();
    setformData2({ account: "", token: "", mobile: "", status: "" });
  };
  const handelSubmit3 = (e) => {
    e.preventDefault();
    setformData3({ key: "", id: "", status: "" });
  };
  const handelSubmit4 = (e) => {
    e.preventDefault();
    setformData4({ username: "", haskkey: "", senderid: "", status: "" });
  };
  const handelSubmit5 = (e) => {
    e.preventDefault();
    setformData5({ username: "", id: "", password: "", status: "" });
  };
  const handelSubmit6 = (e) => {
    e.preventDefault();
    setformData6({ names: "", status: "" });
  };

  return (
    <div className="allworking boxdesign ">
      <span className="fs-4 fw-semibold">System Setting</span>
      <div className="mt-3 rounded-3 border-warning border-3 shadow-lg">
        <div className="d-md-flex p-1 justify-content-md-between align-items-center bg-dark text-white rounded-2 flex-wrap">
          <span className="fs-6 fw-semibold p-2 d-block d-md-inline text-center">SMS Setting</span>
          <div className="px-2" style={{ cursor: "pointer" }}>
            <ul
              className="list-inline m-0 fw-bold"
              style={{ fontSize: "14px" }}
            >
              <li
                className={`list-inline-item  rounded p-2 ${
                  visibleDiv === "sms1" ? "bg-white text-black" : ""
                }`}
                onClick={() => setVisibleDiv("sms1")}
              >
                Clickatell SMS Gateway
              </li>
              <li
                className={`list-inline-item rounded p-2 ${
                  visibleDiv === "sms2" ? "bg-white text-black" : ""
                }`}
                onClick={() => setVisibleDiv("sms2")}
              >
                Twilio SMS Gateway
              </li>
              <li
                className={`list-inline-item cursor-pointer p-2 rounded ${
                  visibleDiv === "sms3" ? "bg-white text-black" : ""
                }`}
                onClick={() => setVisibleDiv("sms3")}
              >
                MSG91
              </li>
              <li
                className={`list-inline-item p-2 rounded ${
                  visibleDiv === "sms4" ? "bg-white text-black" : ""
                }`}
                onClick={() => setVisibleDiv("sms4")}
              >
                Test Local
              </li>
              <li
                className={`list-inline-item rounded p-2 ${
                  visibleDiv === "sms5" ? "bg-white text-black" : ""
                }`}
                onClick={() => setVisibleDiv("sms5")}
              >
                SMS Country
              </li>
              <li
                className={`list-inline-item cursor-pointer rounded p-2 ${
                  visibleDiv === "sms6" ? "bg-white text-black" : ""
                }`}
                onClick={() => setVisibleDiv("sms6")}
              >
                Custom SMS Gateway
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-3 smsdiv">
          {visibleDiv === "sms1" && (
            <div className="border m-0 p-2 row">
              <div className="col-md-8">
                <form className="row" onSubmit={handelSubmit1}>
                  <div className="col-md-12 ">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">
                          Clickatell Username:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="agentName"
                          value={formData1.agentName}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">
                          Clickatell Password:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="password"
                          value={formData1.password}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">
                          Clickatell Api Id:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="apiid"
                          value={formData1.apiid}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Status:</label>
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          value={formData1.status}
                          onChange={handelChange1}
                        >
                          <option value="">Select</option>
                          <option value="enabled">Enabled</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-dark btn-sm px-3">Save</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 my-md-0 my-5 text-center">
                <img src={`${click}`} />
                <br />
                <a
                  href="https://www.clickatell.com/"
                  className="text-decoration-none text-info"
                >
                  https://www.clickatell.com
                </a>
              </div>
            </div>
          )}
          {visibleDiv === "sms2" && (
            <div className="border m-0 p-2 row">
              <div className="col-md-8">
                <form className="row" onSubmit={handelSubmit2}>
                  <div className="col-md-12">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">
                          Twilio Account SID:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="account"
                          value={formData2.account}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">
                          Authentication Token:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="token"
                          value={formData2.token}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">
                          Registered Mobile Number:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="mobile"
                          value={formData2.mobile}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Status:</label>
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          value={formData2.status}
                          onChange={handelChange1}
                        >
                          <option value="">Select</option>
                          <option value="enabled">Enabled</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-dark btn-sm px-3">Save</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 my-md-0 my-5 text-center">
                <img src={`${twilio}`} />
                <br />
                <a
                  href="https://www.twilio.com/?v=t"
                  className="text-decoration-none text-info"
                >
                  https://www.twilio.com
                </a>
              </div>
            </div>
          )}
          {visibleDiv === "sms3" && (
            <div className="border m-0 p-2 row">
              <div className="col-md-8">
                <form className="row" onSubmit={handelSubmit3}>
                  <div className="col-md-12">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Auth Key:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="key"
                          value={formData3.key}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Sender Id:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="id"
                          value={formData3.id}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Status:</label>
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          value={formData3.status}
                          onChange={handelChange1}
                        >
                          <option value="">Select</option>
                          <option value="enabled">Enabled</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-dark btn-sm px-3">Save</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 my-md-0 my-5 text-center">
                <img src={`${msg}`} />
                <br />
                <a
                  href="https://msg91.com/"
                  className="text-decoration-none text-info"
                >
                  https://msg91.com
                </a>
              </div>
            </div>
          )}
          {visibleDiv === "sms4" && (
            <div className="border m-0 p-2 row">
              <div className="col-md-8">
                <form className="row" onSubmit={handelSubmit4}>
                  <div className="col-md-12">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">UserName:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="username"
                          value={formData4.username}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Hask Key:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="haskkey"
                          value={formData4.haskkey}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Sender ID:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="senderid"
                          value={formData4.senderid}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Status:</label>
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          value={formData4.status}
                          onChange={handelChange1}
                        >
                          <option value="">Select</option>
                          <option value="enabled">Enabled</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-dark btn-sm px-3">Save</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 my-md-0 my-5 text-center">
                <img src={`${textlocal}`} />
                <br />
                <a
                  href="https://www.textlocal.in/"
                  className="text-decoration-none text-info"
                >
                  https://www.textlocal.in
                </a>
              </div>
            </div>
          )}
          {visibleDiv === "sms5" && (
            <div className="border m-0 p-2 row">
              <div className="col-md-8">
                <form className="row" onSubmit={handelSubmit5}>
                  <div className="col-md-12 ">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">UserName:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="username"
                          value={formData5.username}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Sender ID:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="id"
                          value={formData5.id}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Password:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="password"
                          value={formData5.password}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Status:</label>
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          value={formData5.status}
                          onChange={handelChange1}
                        >
                          <option value="">Select</option>
                          <option value="enabled">Enabled</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-dark btn-sm px-3">Save</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 my-md-0 my-5 text-center">
                <img src={`${smscountry}`} />
                <br />
                <a
                  href="https://www.smscountry.com/"
                  className="text-decoration-none text-info"
                >
                  https://www.smscountry.com
                </a>
              </div>
            </div>
          )}
          {visibleDiv === "sms6" && (
            <div className="border m-0 p-2 row">
              <div className="col-md-8">
                <form className="row" onSubmit={handelSubmit6}>
                  <div className="col-md-12">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Gateway Name:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="names"
                          value={formData6.names}
                          onChange={handelChange1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="row align-items-md-end">
                      <div className="col-md-6 text-md-end">
                        <label className="form-label pe-3">Status:</label>
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          value={formData6.status}
                          onChange={handelChange1}
                        >
                          <option value="">Select</option>
                          <option value="enabled">Enabled</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-dark btn-sm px-3">Save</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 my-md-0 my-5 text-center">
                <img src={`${custom}`} />
                <br />
                <a href="" className="text-decoration-none text-info"></a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sms_Setting;
