import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
const apiURL = import.meta.env.VITE_APP_API_URL;
const NewSubCategory = () => {
  const initialDetails = {
    subCategoryName: "",
    subCategoryID: "",
    categoryID: "", // Ensure this is part of the initial state
  };

  const [details, setDetails] = useState(initialDetails);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiURL}/api/categories`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
        } else {
          setError(
            `Error fetching categories: ${data.data || "Unknown error"}`
          );
        }
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subCategoryData = {
      id: parseInt(details.subCategoryID, 10),
      name: details.subCategoryName,
      categoryId: parseInt(details.categoryID, 10) || null,
      imageUrl: "/",
    };

    console.log("Submitting SubCategory Data:", subCategoryData);

    try {
      const response = await fetch(`${apiURL}/api/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subCategoryData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Sub-Category added successfully");
        setDetails(initialDetails);
        setError("");
      } else {
        setError(`Error: ${data.data || "Unknown error"}`);
        setSuccess("");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccess("");
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='addContainer'>
        <h1>Add SubCategory</h1>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <p>Sub-Category Name</p>
            <input
              type='text'
              placeholder='SubCategory Name'
              name='subCategoryName'
              value={details.subCategoryName}
              onChange={handleChange}
            />
            <p>Sub-Category ID</p>
            <input
              type='text'
              placeholder='SubCategory ID'
              name='subCategoryID'
              value={details.subCategoryID}
              onChange={handleChange}
            />
            <p>Category ID</p>
            <select
              name='categoryID'
              value={details.categoryID}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} (ID: {category.id})
                </option>
              ))}
            </select>
            <button type='submit'>Add Sub-Category</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewSubCategory;
