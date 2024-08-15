import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import "./userList.scss"; // Ensure this matches the SCSS file name
import Sidebar from "../../components/sidebar/Sidebar";
const apiURL = import.meta.env.VITE_APP_API_URL;
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/api/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          setUsers(data.data);
        } else {
          setError("Failed to fetch users");
        }
        setLoading(false);
      })
      .catch((e) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      type: "dateTime",
    },
    {
      field: "order_in_progress",
      headerName: "Orders in Progress",
      width: 180,
    },
    // Add more fields as necessary
  ];

  const rows = users.map((user) => ({
    id: user.id,
    phone: user.phone,
    address: user.address,
    created_at: new Date(user.created_at), // Format the date for display
    order_in_progress: user.order_in_progress,
    // Map other fields as necessary
  }));

  if (loading) {
    return (
      <div className='user-list-container'>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className='user-list-container'>
        <div className='error-message'>{error}</div>
      </div>
    );
  }

  return (
    <div className='user-list-container'>
      <Sidebar />
      <div className='data-grid-container'>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default UserList;
