import React, { useEffect, useState } from "react";
import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_APP_API_URL;
const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders
  const fetchOrders = () => {
    fetch(`${apiURL}/api/orders`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "ok") {
          const ordersData = response.data.orders.orders;
          setOrders(ordersData);
        } else {
          setError("Error fetching orders");
        }
        setLoading(false);
      })
      .catch((e) => {
        setError("Error fetching orders");
        setLoading(false);
      });
  };

  // Fetch statuses
  const fetchStatuses = () => {
    fetch(`${apiURL}/api/order-statuses`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "ok") {
          setStatuses(response.data);
        } else {
          setError("Error fetching statuses");
        }
      })
      .catch((e) => setError("Error fetching statuses"));
  };

  // Handle status change
  const handleStatusChange = (id, statusId, userId) => {
    const updatedOrders = orders.map((order) =>
      order.order_id === id
        ? { ...order, status_id: statusId, user_id: userId }
        : order
    );
    setOrders(updatedOrders);

    fetch(`${apiURL}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statusId: statusId, userId: userId }), // Sending both statusId and user_id
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "ok") {
          console.error("Error updating order status:", data);
        }
      })
      .catch((e) => console.error("Error updating order status:", e.message));
  };

  // Navigate to details
  const handleDetailToggle = (id) => {
    navigate(`/orders/details/${id}`);
  };

  useEffect(() => {
    fetchOrders();
    fetchStatuses();

    const interval = setInterval(() => {
      fetchOrders();
      fetchStatuses();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    { field: "order_id", headerName: "ID", width: 90 },
    { field: "user_id", headerName: "User ID", width: 150 },
    {
      field: "created_at",
      headerName: "Created At",
      type: "dateTime",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
      type: "dateTime",
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "status_id",
      headerName: "Status",
      width: 300,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleStatusChange(
              params.row.order_id,
              e.target.value,
              params.row.user_id
            )
          }
        >
          {statuses.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <button
          className='detailButton'
          onClick={() => handleDetailToggle(params.row.order_id)}
        >
          See Details
        </button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className='orderListContainer'>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className='orderListContainer'>
        <div className='error-message'>{error}</div>
      </div>
    );
  }

  const rows = orders.map((order) => ({
    order_id: order.order_id,
    user_id: order.user_id,
    created_at: new Date(order.created_at),
    updated_at: new Date(order.updated_at),
    status_id: order.status_id,
    // Map other fields as necessary
  }));

  return (
    <div className='orderListContainer'>
      <div className='list'>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.order_id}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
