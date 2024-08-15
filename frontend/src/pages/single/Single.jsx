import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const apiURL = import.meta.env.VITE_APP_API_URL;

const Single = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiURL}/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setProduct(data.data);
        } else {
          console.error("Failed to fetch product data:", data);
        }
      })
      .catch((e) => console.error("Error fetching product data:", e));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    navigate(`/products/${productId}/edit`);
  };

  const handleHide = () => {
    fetch(`${apiURL}/api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isVisible: false }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setProduct({ ...product, isVisible: false });
        } else {
          console.error("Failed to update product visibility:", data);
        }
      })
      .catch((e) => console.error("Error updating product visibility:", e));
  };

  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        {/* <Navbar /> */}
        <div className='productDetails'>
          <h1>Product Details</h1>
          <div className='details'>
            <h2>{product.name || "No name available"}</h2>
            <p>Visibility: {product.isVisible ? "Visible" : "Hidden"}</p>
            <img
              src={product.image_url || "/path/to/placeholder-image.jpg"}
              alt={product.name || "No image available"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/path/to/placeholder-image.jpg";
              }}
            />
            <p>Cost Price: Rs {product.purchase_price || "N/A"}</p>
            <p>Retail Price: Rs {product.retail_price || "N/A"}</p>
            <p>Selling Price: Rs {product.selling_price || "N/A"}</p>
            <p>Discount: {product.discount || "N/A"}%</p>
            <p>Discounted Price: Rs {product.adjusted_price || "N/A"}</p>
            <p>Quantity: {product.quantity || "NA"}</p>
            <p>Product ID: #{product.id || "N/A"}</p>
            <p>Category ID: #{product.category_id || "N/A"}</p>
            <p>Sub-Category ID: #{product.sub_category_id || "N/A"}</p>
            <p>Stock: {product.stock || "N/A"}</p>
            <p>
              Description: {product.description || "No description available"}
            </p>
          </div>
          <div className='actions'>
            <button className='editButton' onClick={handleEdit}>
              Edit
            </button>
            <button className='hideButton' onClick={handleHide}>
              Hide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
