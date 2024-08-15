import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import Select from "react-select";
const apiURL = import.meta.env.VITE_APP_API_URL;
const NewProduct = () => {
  const initialDetails = {
    productName: "",
    // productId: "",
    category: null,
    categoryId: "",
    subCategory: null,
    subCategoryId: "",
    description: "",
    stock: "",
    url: "",
    costPrice: "",
    retailPrice: "",
    adjustedPrice: "",
    sellingPrice: "",
    discount: "",
  };

  const [details, setDetails] = useState(initialDetails);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${apiURL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        const formattedCategories = data.data.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }));
        setCategories(formattedCategories);
      })
      .catch((e) => setError("Error fetching categories: " + e.message));
  }, []);

  useEffect(() => {
    if (details.categoryId) {
      fetch(`${apiURL}/api/subcategories?category_id=${details.categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          const formattedSubCategories = data.data.map((subCat) => ({
            value: subCat.id,
            label: subCat.name,
          }));
          setSubCategories(formattedSubCategories);
        })
        .catch((e) => setError("Error fetching subcategories: " + e.message));
    }
  }, [details.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setDetails((prev) => {
      const newDetails = { ...prev, [name]: selectedOption };
      if (name === "category") {
        newDetails.categoryId = selectedOption ? selectedOption.value : "";
      }
      if (name === "subCategory") {
        newDetails.subCategoryId = selectedOption ? selectedOption.value : "";
      }
      return newDetails;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the product data
    const productData = {
      name: details.productName,
      // id: details.productId,
      description: details.description,
      retail_price: details.retailPrice,
      purchase_price: details.costPrice,
      selling_price: details.sellingPrice,
      adjusted_price: details.adjustedPrice,
      discount: details.discount,
      category_id: details.categoryId || null,
      sub_category_id: details.subCategoryId || null,
      image_url: details.url,
      stock: details.stock,
    };

    try {
      const response = await fetch(`${apiURL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful response
        setDetails({
          productName: "",
          // productId: "",
          category: null,
          categoryId: "",
          subCategory: null,
          subCategoryId: "",
          description: "",
          stock: "",
          url: "",
          costPrice: "",
          retailPrice: "",
          sellingPrice: "",
          adjustedPrice: "",
          discount: "",
        });
        setError("");
      } else {
        // Handle API errors
        setError(`Error creating product: ${data.data || "Unknown error"}`);
      }
    } catch (error) {
      setError(`Error creating product: ${error.message}`);
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='addContainer'>
        <h1>Add Product</h1>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <p>Product Name</p>
            <input
              type='text'
              placeholder='Product Name'
              name='productName'
              value={details.productName}
              onChange={handleChange}
            />
            <p>Category</p>
            <Select
              name='category'
              options={categories}
              value={details.category}
              onChange={handleSelectChange}
              placeholder='Select Category'
            />
            <p>Category ID</p>
            <input
              type='text'
              placeholder='Category ID'
              name='categoryId'
              value={details.categoryId}
              readOnly
            />
            <p>Sub Category</p>
            <Select
              name='subCategory'
              options={subCategories}
              value={details.subCategory}
              onChange={handleSelectChange}
              placeholder='Select Sub Category'
            />
            <p>Sub Category ID</p>
            <input
              type='text'
              placeholder='Sub Category ID'
              name='subCategoryId'
              value={details.subCategoryId}
              readOnly
            />
            <p>Description</p>
            <textarea
              name='description'
              type='text'
              placeholder='Description'
              value={details.description}
              onChange={handleChange}
            />
            <p>Stock</p>
            <input
              type='text'
              placeholder='Stock'
              name='stock'
              value={details.stock}
              onChange={handleChange}
            />
            <p>Image URL</p>
            <input
              type='text'
              placeholder='URL'
              name='url'
              value={details.url}
              onChange={handleChange}
            />
            <p>Cost Price</p>
            <input
              type='number'
              placeholder='Cost Price'
              name='costPrice'
              value={details.costPrice}
              onChange={handleChange}
            />
            <p>Retail Price</p>
            <input
              type='number'
              placeholder='Retail Price'
              name='retailPrice'
              value={details.retailPrice}
              onChange={handleChange}
            />
            <p>Selling Price</p>
            <input
              type='number'
              placeholder='Selling Price'
              name='sellingPrice'
              value={details.sellingPrice}
              onChange={handleChange}
            />
            <p>Adjusted Price</p>
            <input
              type='number'
              placeholder='Adjusted Price'
              name='adjustedPrice'
              value={details.adjustedPrice}
              onChange={handleChange}
            />
            <p>Discount</p>
            <input
              type='number'
              placeholder='Discount'
              name='discount'
              value={details.discount}
              onChange={handleChange}
            />
            <br />
            <button type='submit'>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
