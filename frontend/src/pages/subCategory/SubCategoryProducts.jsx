import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./subCategoryProducts.scss"; // Adjust the path if necessary
import Sidebar from "../../components/sidebar/Sidebar";
const apiURL = import.meta.env.VITE_APP_API_URL;
const SubCategoryProducts = () => {
  const { id: subCategoryId } = useParams(); // Extract the sub-category ID from the URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch(`${apiURL}/api/products`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Fetched products data:", data);

        if (data.status === "ok") {
          setProducts(data.data);
          filterProductsBySubCategory(data.data);
        } else {
          setError("Failed to fetch products.");
          console.error("Failed to fetch products data:", data);
        }
      } catch (error) {
        setError("Error fetching products data.");
        console.error("Error fetching products data:", error);
      }
    };

    const filterProductsBySubCategory = (allProducts) => {
      console.log("Filtering products by sub-category ID:", subCategoryId);
      if (subCategoryId) {
        const filtered = allProducts.filter(
          (product) => product.sub_category_id === parseInt(subCategoryId)
        );
        console.log("Filtered products:", filtered);
        setFilteredProducts(filtered);
      }
    };

    fetchProducts();
  }, [subCategoryId]);

  console.log("Filtered products state:", filteredProducts);

  if (error) return <div className='error'>{error}</div>;
  if (!filteredProducts.length)
    return <div className='loading'>Loading products...</div>;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "purchase_price", headerName: "Purchase Price", width: 150 },
    { field: "retail_price", headerName: "Retail Price", width: 150 },
    { field: "adjusted_price", headerName: "Adjusted Price", width: 150 },
    { field: "selling_price", headerName: "Selling Price", width: 150 },
    { field: "stock", headerName: "Stock", width: 120 },
  ];

  const rows = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    purchase_price: product.purchase_price,
    retail_price: product.retail_price,
    adjusted_price: product.adjusted_price,
    selling_price: product.selling_price,
    stock: product.stock,
  }));

  return (
    <div className='sub-category-products'>
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

export default SubCategoryProducts;
