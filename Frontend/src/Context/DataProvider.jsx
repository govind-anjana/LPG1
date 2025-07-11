import React, { useEffect, useState } from "react";
import axios from ".././Component/AxiosConfig";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bool1, setBool1] = useState(() => {
    return localStorage.getItem("bool1") === "true";
  });

  const [alertM, setAlertM] = useState(() => {
    return localStorage.getItem("alertM") || "";
  });
  const [employess,setEmployess]=useState([])
  const [date, setDate] = useState(() => {
    const saved = localStorage.getItem("sharedDat");
    return saved ? new Date(saved) : new Date("2025/06/01");
  });

   useEffect(() => {
    localStorage.setItem("alertM", alertM);
    localStorage.setItem("bool1", bool1);
  }, [alertM, bool1]);
  useEffect(() => {
    axios
      .get("/addratelist")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("API Error:", err));
      axios.get("/employeeList").then((res)=>{ setEmployess(res.data).catch((err)=>alert("Api Error:",err))        
      })
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
      value={{ data, loading, date, addOneDay, formatDate,bool1,setBool1,alertM,setAlertM,employess }} >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
