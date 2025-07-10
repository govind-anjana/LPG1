import React from "react";
import { AiOutlineLineChart } from "react-icons/ai";

function Otp_report() {
  function handleSubmit() {
    alert();
  }
  return (
    <div className="allworking boxdesign">
      <span className="fs-4 fw-semibold"><AiOutlineLineChart /> Reports</span>

      <div className="mt-3 settion p-3 bg-light rounded-3 border-top border-warning border-3 shadow-sm">
        <span className="fs-6 fw-semibold">Upload Excel File</span>

        <form onSubmit={handleSubmit}>
          <div className="box-body mt-2">
            <label htmlFor="uploadfile">Upload File</label>
            <input
              type="file"
              id="uploadfile"
              name="uploadfile"
              className="mx-5 my-3"
            />
          </div>

          <div className="form-group col-md-2">
            <label className="invisible"></label>
            <button type="submit" className="btn btn-dark btn-sm">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Otp_report;
