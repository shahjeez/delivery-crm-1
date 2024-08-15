import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./categoryDetail.scss";
import CategoryProducts from "./CategoryProducts";

const CategoryDetail = () => {
  const { id: categoryId } = useParams(); // Get categoryId from URL params
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_APP_API_URL;
  console.log(apiURL);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${apiURL}/api/categories/${categoryId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        if (data.status === "ok") {
          setCategory(data.data);
        } else {
          setError("Category not found.");
          console.error("Failed to fetch category data:", data);
        }
      } catch (error) {
        setError("Error fetching category data.");
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleEdit = () => {
    navigate(`/categories/${categoryId}/edit`);
  };

  const handleHide = async () => {
    try {
      const response = await fetch(`${apiURL}/api/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: false }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.status === "ok") {
        setCategory((prev) => ({ ...prev, isVisible: false }));
      } else {
        console.error("Failed to update category visibility:", data);
        alert("Failed to update category visibility");
      }
    } catch (error) {
      console.error("Error updating category visibility:", error);
    }
  };

  const handleSeeDetails = () => {
    navigate(`/categories/details/${categoryId}/products`);
  };

  if (error) return <div className='error'>{error}</div>;
  if (!category) return <div className='loading'>Loading...</div>;

  return (
    <div className='category-detail'>
      <Sidebar />
      <div className='categoryContainer'>
        <div className='categoryDetails'>
          <h1>Category Details</h1>
          <div className='details'>
            <h2>{category.name || "No name available"}</h2>
            <p>Visibility: {category.isVisible ? "Visible" : "Hidden"}</p>
            <img
              src={category.image_url || "/path/to/placeholder-image.jpg"}
              alt={category.name || "No image available"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/path/to/placeholder-image.jpg";
              }}
            />
            <p>Category ID: {category.id}</p>
            <button className='editButton' onClick={handleEdit}>
              Edit
            </button>
            <button className='hideButton' onClick={handleHide}>
              Hide
            </button>
            <button className='see-products' onClick={handleSeeDetails}>
              See Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
