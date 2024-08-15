import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./dataTable.scss";
import { columns } from "./datatablesource";
import { useNavigate } from "react-router-dom";
// import config from "../../api/config";
const apiURL = import.meta.env.VITE_APP_API_URL;
console.log("API URL:", apiURL);

const DataTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleAddProductToggle = () => {
    navigate("/products/new");
  };

  const handleAddCategoryToggle = () => {
    navigate("/categories/new");
  };

  const handleAddSubCategoryToggle = () => {
    navigate("/subcategories/new");
  };

  const fetchData = () => {
    fetch(`${apiURL}/api/products`)
      .then((res) => res.json())
      .then((response) => {
        console.log("API Response:", response);
        if (response.status === "ok") {
          const productsArray = Array.isArray(response.data)
            ? response.data
            : [];
          setData(productsArray);
        } else {
          console.error("Failed to fetch data:", response);
        }
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewToggle = (params) => {
    navigate(`/products/${params.row.id}`);
  };

  const handleVisibilityToggle = (params) => {
    const product = data.find((p) => p.id === params.row.id);
    const updatedVisibility = !product.visibility;

    const updatedData = data.map((p) =>
      p.id === params.row.id ? { ...p, visibility: updatedVisibility } : p
    );
    setData(updatedData);

    fetch(`${apiURL}/api/products/${params.row.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visibility: updatedVisibility }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update visibility");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Visibility updated:", data);
      })
      .catch((e) => console.log(e.message));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const product = data.find((p) => p.id === params.row.id);
        return (
          <div className='cellAction'>
            <button
              className='viewButton'
              onClick={() => handleViewToggle(params)}
            >
              View
            </button>
            <button
              className='removeButton'
              onClick={() => handleVisibilityToggle(params)}
            >
              {product.visibility ? "Hide" : "Show"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='dataTable'>
      <div className='buttons'>
        <button className='addProduct' onClick={handleAddProductToggle}>
          Add Product
        </button>
        <button className='addCategory' onClick={handleAddCategoryToggle}>
          Add Category
        </button>
        <button className='addSubCategory' onClick={handleAddSubCategoryToggle}>
          Add SubCategory
        </button>
      </div>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
