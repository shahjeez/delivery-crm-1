import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./orderDetail.scss"; // Assuming you have SCSS file
import Sidebar from "../../components/sidebar/Sidebar";
const apiURL = import.meta.env.VITE_APP_API_URL;
const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`${apiURL}/api/orders/${id}`);
          setOrder(response.data.data);
          setSelectedStatus(response.data.data.status_id);
        } catch (error) {
          setError("Error fetching order details");
          console.error("Error fetching order details:", error);
        }
      };

      const fetchStatuses = async () => {
        try {
          const response = await axios.get(`${apiURL}/api/order-statuses`);
          setStatuses(response.data.data);
        } catch (error) {
          setError("Error fetching order statuses");
          console.error("Error fetching order statuses:", error);
        }
      };

      fetchOrder();
      fetchStatuses();
    } else {
      setError("Order ID is undefined or null.");
    }
  }, [id]);

  const handleStatusChange = async (event) => {
    const newStatusId = event.target.value;
    setSelectedStatus(newStatusId);

    try {
      // Prepare the payload with 'statusId' and 'user_id' as expected by the API
      const updatedOrder = {
        statusId: newStatusId,
        user_id: order.user_id, // Including the user ID in the payload
      };

      console.log("Sending update request with data:", updatedOrder);

      const response = await axios.put(
        `${apiURL}/api/orders/${id}`,
        updatedOrder,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);

      if (response.status === 200) {
        console.log("Order status updated successfully.");
        setOrder((prevOrder) => ({
          ...prevOrder,
          status_id: newStatusId, // Update the UI with the new status
        }));
      } else {
        console.error("Failed to update order status:", response.data);
        setError("Failed to update order status");
      }
    } catch (error) {
      console.error(
        "Error updating order status:",
        error.response || error.message
      );
      setError("Error updating order status");
    }
  };

  const handlePrintButton = () => {
    navigate(`/orders/order-bill/${id}`, { state: { order } });
  };

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className='order-detail'>
      <Sidebar />
      <h1>Order Details</h1>
      <div className='order-info'>
        <div>
          <strong>Order ID:</strong> {order.order_id}
        </div>
        <div>
          <strong>User ID:</strong> {order.user_id}
        </div>
        <div>
          <strong>Address:</strong> {order.address}
        </div>
        <div>
          <strong>Order Status:</strong>
          <select value={selectedStatus} onChange={handleStatusChange}>
            {statuses.map((status) => (
              <option
                key={status.id}
                value={status.id}
                style={{ backgroundColor: getStatusColor(status.id) }}
              >
                {status.status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <strong>Short Status:</strong> {order.short_status}
        </div>
        <div>
          <strong>Total Amount:</strong> {order.total_amount || "Not available"}
        </div>
        <div>
          <strong>Payment Method:</strong>{" "}
          {order.payment_method || "Not available"}
        </div>
        <div>
          <strong>Gross Margin:</strong> {order.gross_margin || "Not available"}
        </div>
        <div>
          <strong>Order Cost with Delivery:</strong>{" "}
          {order.order_cost_with_delivery || "Not available"}
        </div>
        <div>
          <strong>Order Cost without Delivery:</strong>{" "}
          {order.order_cost_without_delivery || "Not available"}
        </div>
      </div>
      <div className='printBillBtn'>
        <button className='printBill' onClick={handlePrintButton}>
          Print Bill
        </button>
      </div>
      <h2>Products</h2>
      <div className='order-products'>
        {order.products && order.products.length > 0 ? (
          <table className='product-table'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Retail Price</th>
                <th>Selling Price</th>
                <th>Quantity</th>
                <th>Adjusted Price</th>
                {/* <th>Stock</th>
                <th>Image</th> */}
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.name}</td>
                  <td>{product.retail_price}</td>
                  <td>{product.selling_price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.adjusted_price}</td>
                  {/* <td>{product.stock}</td> */}
                  {/* Uncomment the following line if you want to display the product image */}
                  {/* <td>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="product-image"
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (statusId) => {
  switch (statusId) {
    case 1:
      return "#FFDDC1"; // Example color for "Waiting for confirmation"
    case 2:
      return "#FFAB91"; // Example color for "Processing your order"
    case 3:
      return "#FFC3A0"; // Example color for "Items are being collected"
    case 4:
      return "#B9FBC0"; // Example color for "Order is on the way"
    case 5:
      return "#A3D9A0"; // Example color for "Your order was delivered!"
    case 6:
      return "#FF9B9B"; // Example color for "Your order was cancelled"
    default:
      return "#FFFFFF"; // Default color
  }
};

export default OrderDetail;
