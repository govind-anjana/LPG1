import React, { useEffect, useState } from "react";
import axios from ".././Component/AxiosConfig";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  const [bool1, setBool1] = useState(() => localStorage.getItem("bool1") === "true");
  const [alertM, setAlertM] = useState(() => localStorage.getItem("alertM") || "");
  const [employess, setEmployess] = useState([]);

  const [date, setDate] = useState(() => {
    const saved = localStorage.getItem("sharedDat");
    return saved ? new Date(saved) : new Date("2025/06/01");
  });

  // ✅ Detect First Load
  useEffect(() => {
    const firstLoad = localStorage.getItem("firstLoadDone");
    if (!firstLoad) {
      // First time: hide alertM and bool1
      localStorage.removeItem("alertM");
      localStorage.removeItem("bool1");
      localStorage.setItem("firstLoadDone", "true");
      setBool1(false);
      setAlertM("");
    }
  }, []);

  // Save to localStorage when bool1 or alertM change
  useEffect(() => {
    localStorage.setItem("bool1", bool1);
    localStorage.setItem("alertM", alertM);
  }, [bool1, alertM]);

  // Fetch data
  useEffect(() => {
    axios.get("/addratelist")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("API Error:", err));

    axios.get("/employeeList")
      .then((res) => setEmployess(res.data))
      .catch((err) => alert("API Error:", err));

    localStorage.setItem("sharedDat", date.toISOString());
  }, [date]);

  const addOneDay = () => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    setDate(next);
  };

  const formatDate = () => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        date,
        addOneDay,
        formatDate,
        bool1,
        setBool1,
        alertM,
        setAlertM,
        employess,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
