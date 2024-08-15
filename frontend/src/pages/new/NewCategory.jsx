import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
const apiURL = import.meta.env.VITE_APP_API_URL;

const NewCategory = () => {
  const initialDetails = {
    categoryName: "",
    categoryID: "",
  };
  const [details, setDetails] = useState(initialDetails);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = {
      id: parseInt(details.categoryID),
      name: details.categoryName,
      image_url: "/",
    };

    try {
      const response = await fetch(`${apiURL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Category added successfully");
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
        <h1>Add Category</h1>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <p>Category Name</p>
            <input
              type='text'
              placeholder='Category'
              name='categoryName'
              onChange={handleChange}
              value={details.categoryName}
            />
            <p>Category ID</p>
            <input
              type='text'
              placeholder='Category ID'
              name='categoryID'
              onChange={handleChange}
              value={details.categoryID}
            />
            <button type='submit'>Add Category</button>
          </form>
          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
