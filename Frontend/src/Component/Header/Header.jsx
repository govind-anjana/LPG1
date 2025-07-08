import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../../Context/DataContext";
function Header() {
  const navigate = useNavigate();
  const { formatDate } = useContext(DataContext);
  const [dd, mmm, yyyy] = formatDate().split("-");
  const str = String(mmm);
  const num = parseInt(str); 
  const result = num.toString();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="header bg-dark p-2 d-flex justify-content-between align-items-center text-white px-3 flex-wrap">
      <div>&nbsp;</div>
      <div className="fs-5 fw-semibold me-md-5">
        <span className="me-3" style={{ color: "gold" }}>
          Application Date : {`${dd}-${monthNames[result-1]}-${yyyy}`}
        </span>
        <Link to="/app/getall_stock_details">
          <button className="btn btn-secondary px-3 btn-sm">EOD</button>
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-sm btn-light px-3 mx-2 fw-semibold"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
