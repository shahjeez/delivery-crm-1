import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./subCategoryDetails.scss";
const apiURL = import.meta.env.VITE_APP_API_URL;
const SubCategoryDetail = () => {
  const { id: subCategoryId } = useParams(); // Ensuring the param name matches the backend route
  const [subCategory, setSubCategory] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiURL}/api/subcategories/${subCategoryId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setSubCategory(data.data);
        } else {
          setError("Subcategory not found.");
          console.error("Failed to fetch subcategory data:", data);
        }
      })
      .catch((e) => {
        setError("Error fetching subcategory data.");
        console.error("Error fetching subcategory data:", e);
      });
  }, [subCategoryId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!subCategory) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    navigate(`/subcategories/${subCategoryId}/edit`);
  };

  const handleHide = () => {
    fetch(`${apiURL}/api/subcategories/${subCategoryId}`, {
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
          setSubCategory({ ...subCategory, isVisible: false });
        } else {
          console.error("Failed to update subcategory visibility:", data);
          alert("Failed to update subcategory visibility");
        }
      })
      .catch((e) => console.error("Error updating subcategory visibility:", e));
  };
  const handleSeeProducts = () => {
    navigate(`/subcategories/details/${subCategoryId}/products`);
  };

  return (
    <div className='subcategory-detail'>
      <Sidebar />
      <div className='subcategoryContainer'>
        <div className='subcategoryDetails'>
          <h1>Subcategory Details</h1>
          <div className='details'>
            <h2>{subCategory.name || "No name available"}</h2>
            <p>Visibility: {subCategory.isVisible ? "Visible" : "Hidden"}</p>
            <img
              src={subCategory.image_url || "/path/to/placeholder-image.jpg"}
              alt={subCategory.name || "No image available"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/path/to/placeholder-image.jpg";
              }}
            />
            <p>Subcategory ID: {subCategory.id}</p>
            <button className='editButton' onClick={handleEdit}>
              Edit
            </button>
            <button className='hideButton' onClick={handleHide}>
              Hide
            </button>
            <button className='see-products' onClick={handleSeeProducts}>
              See Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryDetail;
