import React, { useState } from "react";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("")
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("danger");
      return;
    }

    if (formData.currentPassword === "govind") {
      setMessage("Password changed successfully!");
      setMessageType("success");
    } else {
      setMessage("Incorrect current password.");
      setMessageType("danger");
    }
  };
  return (
    <div className="allworking boxdesign">
      <div className="m-md-5 p-md-4 p-2 rounded-3 bg-white shadow-lg row justify-content-center">
        <div className="col-md-8">   
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-12 text-center mb-4">
              <h5 className="fw-bold">Change Password</h5>
            </div>
                 {message && (
            <div className={`alert alert-${messageType} text-center`} role="alert">
              {message}
            </div>
          )}
            <div className="col-md-12 mb-3">
              <div className="row align-items-center">
                <label className="col-md-6 text-md-end form-label pe-3">
                  Current Password
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    name="currentPassword"
                   
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="row align-items-center">
                <label className="col-md-6 text-md-end form-label pe-3">
                  New Password
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    name="newPassword"
                   
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 mb-3">
              <div className="row align-items-center">
                <label className="col-md-6 text-md-end form-label pe-3">
                  Confirm Password
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    name="confirmPassword"
                   
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 text-center mt-3">
              <button type="submit" className="btn btn-dark btn-sm px-4">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword;
