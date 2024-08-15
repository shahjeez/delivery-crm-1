import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./subCategory.scss";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
const apiURL = import.meta.env.VITE_APP_API_URL;
const SubCategoryList = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);

  // Fetch subcategories
  const fetchSubCategories = () => {
    fetch(`${apiURL}/api/subcategories`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "ok") {
          setSubCategories(response.data);
        } else {
          console.error("Error fetching subcategories:", response);
        }
      })
      .catch((e) => console.error("Error fetching subcategories:", e.message));
  };

  // Navigate to details
  const handleDetailToggle = (id) => {
    navigate(`/subcategories/details/${id}`);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "action",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <button
          className='detailButton'
          onClick={() => handleDetailToggle(params.row.id)}
        >
          See Details
        </button>
      ),
    },
  ];

  return (
    <div className='subCategoryListContainer'>
      <Sidebar />
      <div className='list'>
        <div className='buttons'>
          <button
            className='addSubCategory'
            onClick={() => navigate("/subcategories/new")}
          >
            Add SubCategory
          </button>
        </div>
        <div className='dataTable'>
          <DataGrid
            rows={subCategories}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryList;
