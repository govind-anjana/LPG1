import React from "react";

function General_Setting() {
  return (
    <div className="setting allworking boxdesign  p-2">
      <span className="fs-4 fw-semibold">System Settings</span>
      <div className="d-md-flex mt-3 gap-4 flex-wrap">
        <div className="div1 settion p-2 bg-light rounded-2   border-3 shadow-sm ">
          <div className="imgdiv"><img src="http://"/></div>
          <br />
          <button className="btn btn-sm btn-dark my-2 px-3">Edit Logo</button>
        </div>
        <div className="flex-fill settion px-2 bg-light rounded-2  border-3 shadow-sm">
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <span className="fs-6">General Setting</span>
            <div>
              <button className="btn btn-sm btn-dark px-4">Edit</button>
            </div>
          </div>
          <div className="table-responsive">
            <table
              className="table w-100 table-striped"
              style={{ fontSize: "14px" }}
            >
              <thead>
                <tr>
                  <th>App Name</th>
                  <td>Anshul Sharma</td>
                </tr>
              </thead>
              <tbody>
              <tr>
                <th>Address</th>
                <td>Ratlam</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>1234567890</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>xyz@gmail.com</td>
              </tr>
              <tr>
                <th>Language</th>
                <td>English</td>
              </tr>
              <tr>
                <th>Timezone</th>
                <td>Asia/Kolkata</td>
              </tr>
              <tr>
                <th>Date Fromat</th>
                <td>dd-mm-yyyy</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General_Setting;
