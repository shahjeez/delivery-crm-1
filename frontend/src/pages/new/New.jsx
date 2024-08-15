import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import config from "../../api/config";
const New = () => {
  return (
    <div className='new'>
      <Sidebar />
      <div className='addContainer'>
        <h1>Add Product</h1>
        <div className='form'>
          <form>
            <p>Product Name</p>
            <input type='text' placeholder='Product Name' />
            <p>Product ID</p>
            <input type='number' placeholder='Product ID' />
            <p>Category</p>
            <input type='text' placeholder='Category' />
            <p>Category ID</p>
            <input type='number' placeholder='Category ID' />
            <p>Sub Category</p>
            <input type='text' placeholder='Sub Category' />
            <p>Sub Category ID</p>
            <input type='number' placeholder='Sub Category' />
            <p>Stock</p>
            <input type='number' placeholder='Stock' />
            <p>Image URL</p>
            <input type='text' placeholder='URL' />
            <p>Cost Price</p>
            <input type='number' placeholder='Cost Price' />
            <p>Retail Price</p>
            <input type='number' placeholder='Retail Price' />
            <p>Discount</p>
            <input type='number' placeholder='Discount' />
            <br />
            <button type='submit'>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default New;
