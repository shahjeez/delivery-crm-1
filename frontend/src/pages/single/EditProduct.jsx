import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./editProduct.scss";
const apiURL = import.meta.env.VITE_APP_API_URL;

const EditProduct = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [productDetails, setProductDetails] = useState({
    productName: "",
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
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch categories
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
    // Fetch subcategories when a category is selected
    if (productDetails.categoryId) {
      fetch(
        `${apiURL}/api/subcategories?category_id=${productDetails.categoryId}`
      )
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
  }, [productDetails.categoryId]);

  useEffect(() => {
    // Fetch product details when component mounts
    fetch(`${apiURL}/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        const product = data.data;
        setProductDetails({
          productName: product.name,
          category:
            categories.find((cat) => cat.value === product.category_id) || null,
          categoryId: product.category_id,
          subCategory:
            subCategories.find(
              (sub) => sub.value === product.sub_category_id
            ) || null,
          subCategoryId: product.sub_category_id,
          description: product.description,
          stock: product.stock,
          url: product.image_url,
          costPrice: product.purchase_price,
          retailPrice: product.retail_price,
          adjustedPrice: product.adjusted_price,
          sellingPrice: product.selling_price,
          discount: product.discount,
        });
      })
      .catch((e) => setError("Error fetching product details: " + e.message));
  }, [productId, categories, subCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setProductDetails((prev) => {
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

    const productData = {
      name: productDetails.productName,
      description: productDetails.description,
      retail_price: productDetails.retailPrice,
      purchase_price: productDetails.costPrice,
      selling_price: productDetails.sellingPrice,
      adjusted_price: productDetails.adjustedPrice,
      discount: productDetails.discount,
      category_id: productDetails.categoryId || null,
      sub_category_id: productDetails.subCategoryId || null,
      image_url: productDetails.url,
      stock: productDetails.stock,
    };

    try {
      const response = await fetch(`${apiURL}/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful response
        setProductDetails({
          productName: "",
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
        setError(`Error updating product: ${data.data || "Unknown error"}`);
      }
    } catch (error) {
      setError(`Error updating product: ${error.message}`);
    }
  };

  return (
    <div className='edit'>
      <Sidebar />
      <div className='editContainer'>
        {/* <Navbar /> */}
        <div className='form'>
          <form onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <p>Product Name</p>
            <input
              type='text'
              placeholder='Product Name'
              name='productName'
              value={productDetails.productName}
              onChange={handleChange}
            />
            <p>Category</p>
            <Select
              name='category'
              options={categories}
              value={productDetails.category}
              onChange={handleSelectChange}
              placeholder='Select Category'
            />
            <p>Category ID</p>
            <input
              type='text'
              placeholder='Category ID'
              name='categoryId'
              value={productDetails.categoryId}
              readOnly
            />
            <p>Sub Category</p>
            <Select
              name='subCategory'
              options={subCategories}
              value={productDetails.subCategory}
              onChange={handleSelectChange}
              placeholder='Select Sub Category'
            />
            <p>Sub Category ID</p>
            <input
              type='text'
              placeholder='Sub Category ID'
              name='subCategoryId'
              value={productDetails.subCategoryId}
              readOnly
            />
            <p>Description</p>
            <textarea
              name='description'
              type='text'
              placeholder='Description'
              value={productDetails.description}
              onChange={handleChange}
            />
            <p>Stock</p>
            <input
              type='text'
              placeholder='Stock'
              name='stock'
              value={productDetails.stock}
              onChange={handleChange}
            />
            <p>Image URL</p>
            <input
              type='text'
              placeholder='URL'
              name='url'
              value={productDetails.url}
              onChange={handleChange}
            />
            <p>Cost Price</p>
            <input
              type='number'
              placeholder='Cost Price'
              name='costPrice'
              value={productDetails.costPrice}
              onChange={handleChange}
            />
            <p>Retail Price</p>
            <input
              type='number'
              placeholder='Retail Price'
              name='retailPrice'
              value={productDetails.retailPrice}
              onChange={handleChange}
            />
            <p>Selling Price</p>
            <input
              type='number'
              placeholder='Selling Price'
              name='sellingPrice'
              value={productDetails.sellingPrice}
              onChange={handleChange}
            />
            <p>Adjusted Price</p>
            <input
              type='number'
              placeholder='Adjusted Price'
              name='adjustedPrice'
              value={productDetails.adjustedPrice}
              onChange={handleChange}
            />
            <p>Discount</p>
            <input
              type='number'
              placeholder='Discount'
              name='discount'
              value={productDetails.discount}
              onChange={handleChange}
            />
            <br />
            <button type='submit'>Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
