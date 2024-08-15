import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./categoryProducts.scss"; // Adjust the path if necessary
import Sidebar from "../../components/sidebar/Sidebar";
const apiURL = import.meta.env.VITE_APP_API_URL;

const CategoryProducts = () => {
  const { id: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiURL}/api/products`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Fetched products data:", data);

        if (data.status === "ok") {
          setProducts(data.data);
          filterProductsByCategory(data.data);
        } else {
          setError("Failed to fetch products.");
          console.error("Failed to fetch products data:", data);
        }
      } catch (error) {
        setError("Error fetching products data.");
        console.error("Error fetching products data:", error);
      }
    };

    const filterProductsByCategory = (allProducts) => {
      if (categoryId) {
        const filtered = allProducts.filter(
          (product) => product.category_id === parseInt(categoryId)
        );
        console.log("Filtered products:", filtered);
        setFilteredProducts(filtered);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleViewToggle = (params) => {
    navigate(`/products/${params.row.id}`);
  };

  const handleHideToggle = (params) => {
    const updatedProducts = filteredProducts.map((product) =>
      product.id === params.row.id ? { ...product, isVisible: false } : product
    );
    setFilteredProducts(updatedProducts);

    fetch(`${config.DATABASE_URL}/api/products/${params.row.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isVisible: false }),
    }).catch((e) => console.log(e.message));
  };

  if (error) return <div className='error'>{error}</div>;
  if (!filteredProducts.length)
    return <div className='loading'>Loading products...</div>;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "selling_price", headerName: "Selling Price", width: 150 },
    { field: "purchase_price", headerName: "Purchase Price", width: 150 },
    { field: "adjusted_price", headerName: "Adjusted Price", width: 150 },
    { field: "retail_price", headerName: "Discounted Price", width: 150 },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className='cellAction'>
          <button
            className='viewButton'
            onClick={() => handleViewToggle(params)}
          >
            View
          </button>
          <button
            className='removeButton'
            onClick={() => handleHideToggle(params)}
          >
            Hide
          </button>
        </div>
      ),
    },
  ];

  const rows = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    purchase_price: product.purchase_price,
    adjusted_price: product.adjusted_price,
    retail_price: product.retail_price,
    selling_price: product.selling_price,
    stock: product.stock,
  }));

  return (
    <div className='category-products'>
      <Sidebar />
      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default CategoryProducts;
