import React from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import moment from "moment"; // Import moment
import "./orderBill.scss";

const OrderBill = () => {
  const location = useLocation();
  const { order } = location.state;

  const handlePrint = () => {
    window.print();
  };

  const handleSnapshot = async () => {
    const element = document.querySelector(".order-bill-content");
    if (element) {
      try {
        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `order_bill_${order.order_id}.png`;
        link.click();
      } catch (error) {
        console.error("Error taking snapshot:", error);
      }
    }
  };

  const formatDateTime = (dateString) => {
    try {
      return moment(dateString).format("DD-MM-YYYY HH:mm:ss");
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="order-bill">
      <div className="order-bill-content">
        <h1>Order Bill</h1>
        <div className="order-details">
          <div className="detail-item">
            <strong>Order ID:</strong> {order.order_id}
          </div>
          <div className="detail-item">
            <strong>Address:</strong> {order.address}
          </div>
          <div className="detail-item">
            <strong>Total Amount:</strong> {order.total_amount}
          </div>
          <div className="detail-item">
            <strong>Payment Method:</strong> {order.payment_method}
          </div>
          <div className="detail-item">
            <strong>Order Time:</strong> {formatDateTime(order.created_at)}
          </div>
        </div>
        <h2>Products</h2>
        <div className="order-products">
          {order.products && order.products.length > 0 ? (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.name}</td>
                    <td>{product.selling_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
      <div className="buttons">
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
        <button className="snapshot-button" onClick={handleSnapshot}>
          Download Snapshot
        </button>
      </div>
    </div>
  );
};

export default OrderBill;
