import React, { useState } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Set isCollapsed to true by default
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className='top'>
        <button className='menu-btn' onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <Link to='/' style={{ textDecoration: "none" }}>
          <span className='logo'>ZIPPIE</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <Link to='/home' style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to='/users' style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/categories' style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className='icon' />
              <span>Category</span>
            </li>
          </Link>
          <Link to='/subcategories' style={{ textDecoration: "none" }}>
            <li>
              <CategoryOutlinedIcon className='icon' />
              <span>SubCategory</span>
            </li>
          </Link>
          <Link to='/products' style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className='icon' />
              <span>Products</span>
            </li>
          </Link>
          <Link to='/orders' style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className='icon' />
              <span>Orders</span>
            </li>
          </Link>
          <p className='title'>USER</p>
          <li>
            <SettingsIcon className='icon' />
            <span>Settings</span>
          </li>
          <li>
            <AccountCircleIcon className='icon' />
            <span>Profile</span>
          </li>
          {/* <Link to='/login' style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className='icon' />
              <span>Logout</span>
            </li>
          </Link> */}
        </ul>
      </div>
      {/* <div className='bottom'>
        <div className='colorOption'></div>
        <div className='colorOption'></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
