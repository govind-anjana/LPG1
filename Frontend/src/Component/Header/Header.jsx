import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaUserAlt,
  FaRegUser,
} from "react-icons/fa";
import DataContext from "../../Context/DataContext";
import { MdOutlineExitToApp } from "react-icons/md";
function Header() {
  const navigate = useNavigate();
  const { formatDate } = useContext(DataContext);
  const [show, setShow] = useState(false);
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".super-admin-dropdown")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("alertM");
    localStorage.removeItem("bool1");
    navigate("/");
  };
  const handleSuperAdmin = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="header bg-dark p-2 d-md-flex justify-content-md-between align-items-center text-white px-3 flex-wrap ">
        <div>&nbsp;</div>
        <div className="fs-5 fw-semibold me-md-5 text-center ">
          <span className="me-3" style={{ color: "gold" }}>
            Application Date : {`${dd}-${monthNames[result - 1]}-${yyyy}`}
          </span>
          <Link to="/app/getall_stock_details">
            <button className=" btn btn-secondary px-3 btn-sm fw-semibold">
              EOD <MdOutlineExitToApp />
            </button>
          </Link>
        </div>
        <div className="position-relative super-admin-dropdown">
          <div
            className="text-end px-3 mx-2  text-white fw-semibold"
            onClick={handleSuperAdmin}
            style={{ cursor: "pointer" }}
          >
            Super Admin <FaRegUser />
            &nbsp;{show ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          {show && (
            <ul className="dropdown-menu show position-absolute end-0 mt-3 me-1">
              <li>
                <Link
                  to="/app/change-password"
                  onClick={() => setShow(false)}
                  className="dropdown-item fw-semibold"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item fw-semibold"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
