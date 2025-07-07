import React, { useEffect, useState } from "react";
import axios from ".././Component/AxiosConfig";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/addratelist") 
      .then((res) => {
        setData(res.data);

        setLoading(false);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
