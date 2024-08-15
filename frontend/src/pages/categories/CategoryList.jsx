import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./category.scss";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const apiURL = import.meta.env.VITE_APP_API_URL;

  // Fetch categories
  const fetchCategories = () => {
    fetch(`${apiURL}/api/categories`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "ok") {
          // Exclude image_url from data
          const filteredCategories = response.data.map(
            ({ image_url, ...rest }) => rest
          );
          setCategories(filteredCategories);
        } else {
          console.error("Error fetching categories:", response);
        }
      })
      .catch((e) => console.error("Error fetching categories:", e.message));
  };

  // Navigate to details
  const handleDetailToggle = (id) => {
    navigate(`/categories/details/${id}`);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
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
    <div className='categoryListContainer'>
      <Sidebar />
      <div className='buttonContainer'>
        <button
          className='addButton'
          onClick={() => navigate("/categories/new")}
        >
          Add Category
        </button>
      </div>
      <div className='list'>
        <div className='dataTable'>
          <DataGrid
            rows={categories}
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

export default CategoryList;
