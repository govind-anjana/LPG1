import React, { useState } from "react";

function Email_Setting() {
  const [engine, setEngine] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    server: "",
    port: "",
    security: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify({ engine, ...formData }, null, 2));
  };

  return (
    <div className="allworking border-3 boxdesign p-2">
      <span className="fs-4 fw-semibold">System Setting</span>
      <div className="mt-3 p-md-4 p-2 bg-light rounded-3  border-3 shadow-sm">
        <span className="fs-6 fw-semibold">Email Setting</span>

        <form onSubmit={handleSubmit}>
          <div className="table-responsive setting_table mx-auto">
            <table className="table ">
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="engine">Email Engine</label>
                  </th>
                  <td>
                    <select
                      id="engine"
                      value={engine}
                      onChange={(e) => setEngine(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="smtp">SMTP</option>
                    </select>
                  </td>
                </tr>

                {engine && (
                  <>
                    <tr>
                      <th>
                        <label htmlFor="username">SMTP Username</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Enter SMTP username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <label htmlFor="password">SMTP Password</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="password"
                          name="password"
                          placeholder="Enter SMTP password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <label htmlFor="server">SMTP Server</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="server"
                          name="server"
                          placeholder="smtp.example.com"
                          value={formData.server}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <label htmlFor="port">SMTP Port</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="port"
                          name="port"
                          placeholder="587"
                          value={formData.port}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <label htmlFor="security">SMTP Security</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="security"
                          name="security"
                          placeholder="SSL/TLS"
                          value={formData.security}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                <tr>
                  <td colSpan="2" className="text-center">
                    <button type="submit" className="btn btn-dark btn-sm px-4">
                      Save
                    </button>
                  </td>
                </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Email_Setting;
