import axios from "../AxiosConfig";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FaEdit} from "react-icons/fa";
import { FaDeleteLeft,FaBook } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../Context/DataContext";
function ItemGroupNfr() {
  const {bool1,setBool1,alertM,setAlertM}=useContext(DataContext)
  const [itemGroupName,setItemGroupName]=useState("")
  const date=new Date().toLocaleTimeString()
  const [itemGroup_list, setItemGroup_list] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editData = location.state?.empData;
  
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/itemgrouplist");
      setItemGroup_list(res.data);
    } catch (err) {
      console.error(" Error fetching employee list:", err.message);
    }
  };
  function Edithandle(id, data) {
    navigate(`/app/itemGroupNfr/${id}`, { state: { empData: data } });
  }
  async function Deletehandle(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`/deleteItemgroup/${id}`);
      res.data;
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  }
  useEffect(() => {
    fetchEmployees();
   
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try{
      await axios.put(`/itemgroup/${id}`,{
        itemGroupName,update_ty:"U",
        
       }  );
      alert("Update Data");
      fetchEmployees();
      }
      catch(err){
        alert(err)
      }
    } else {
      try {
         setBool1(true);
         setAlertM("Item Group NFR Added Successfully")
       await axios.post("/itemgroup",{
        itemGroupName,update_ty:"A", date
       } );
        fetchEmployees();
      } catch (err) {
        alert("Failed to save agent.");
      }
    }
    navigate(`/app/itemGroupNfr`);
    setItemGroupName("")
}
  useEffect(() => {
    if (id && editData) {
        setItemGroupName(editData.itemGroupName)
    }
  }, [id, editData]);

  return (
    <div className="expensehead allworking boxdesign ">
      <span className="fs-4 fw-semibold"><FaBook/> Item Group NFR</span>
      <div className="d-md-flex mt-3 gap-4 flex-wrap align-items-start">
        <div
          className="headdiv settion p-3 bg-light rounded-2  border-warning border-3 shadow-sm "
        >
        <span className="fs-6 fw-semibold ">Add Item Group NFR</span>
         {bool1 && (
          <div className="alert alert-success text-success my-2" role="alert">
            {alertM}
          </div>
        )}
          <form onSubmit={handleSubmit}>
            <div className="row agentname">
              <div className="col-sm-12 mb-3">
                <label className="form-label">Item Group Name</label>
                <input
                  type="text"

                  name="itemGroupName"
                    value={itemGroupName}
                    onChange={e=>setItemGroupName(e.target.value)}
                />
              </div>
             </div>

            <div className="text-end my-3">
              <button type="submit" className="btn btn-dark btn-sm px-3">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="flex-fill settion allworking p-3 bg-light rounded-2 border-top border-warning border-3 shadow-sm">
          <span className="fs-6 fw-semibold">Item Group Name List</span>
          <br />
          <div className="my-2 d-flex justify-content-between">
            <input
              type="text"
              placeholder="Search..."
              style={{ maxWidth: "180px" }}
            />
            <div></div>
          </div>
          <div className="table-responsive  pb-2">
            <table
              className="table table-striped text-capitalize"
              style={{ fontSize: "14px" }}
            >
              <thead className="table-secondary">
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
              
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemGroup_list.length > 0 ? (
                  itemGroup_list.map((item, index) => (
                    <tr key={index}>
                   
                      <td>{++index}</td>
                      <td>{item.itemGroupName}</td>
                      <td>
                        <div className="divbtn">
                          {item.update_ty == "A" ? (
                            <span>
                              <FaEdit
                                onClick={() => Edithandle(item._id, item)}
                                title="Edit"
                              />
                              <FaDeleteLeft
                                onClick={() => Deletehandle(item._id)}
                                title="Delete"
                                className="ms-3"
                              />
                            </span>
                          ) : (
                            <span
                              style={{ cursor: "not-allowed", color: "silver" }}
                            >
                              <FaEdit />
                              <FaDeleteLeft className="ms-3" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center align-middle">
                      <div className="text-center py-3">
                        <span className="text-warning">
                          No data available in table
                        </span>
                        <br />
                        <img
                          src="http:/placeholde"
                          alt="No data"
                          className="my-4"
                        />
                        <br />
                        <span className="text-success">
                          Add new record or search with different criteria.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={5}>
                    <span className=" text-muted small">{`Records : 1 to ${itemGroup_list.length} to  ${itemGroup_list.length}`}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemGroupNfr;
