import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Remove PrivateRoute import
// import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home/Home";
// Remove LoginPage import
// import LoginPage from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import CategoryList from "./pages/categories/CategoryList";
import SubCategoryList from "./pages/subCategory/SubCategory";
import NewProduct from "./pages/new/NewProduct";
import NewCategory from "./pages/new/NewCategory";
import NewSubCategory from "./pages/new/NewSubCategory";
import EditProduct from "./pages/single/EditProduct";
import OrderBill from "./pages/orders/OrderBill";
import CategoryDetail from "./pages/categories/CategoryDetail";
import OrderPage from "./pages/orders/OrderPage";
import SubCategoryDetail from "./pages/subCategory/SubCategoryDetails";
import CategoryProducts from "./pages/categories/CategoryProducts";
import SubCategoryProducts from "./pages/subCategory/SubCategoryProducts";
import UserList from "./pages/users/UserList";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirect root to home page or another suitable page */}
      <Route path='/' element={<Navigate to='/home' />} />
      {/* Remove the login route */}
      {/* <Route path='login' element={<LoginPage />} /> */}
      <Route path='home' element={<Home />} />
      <Route path='users' element={<UserList />} />
      <Route path='users/:userId' element={<Single />} />
      <Route path='products' element={<List />} />
      <Route path='products/:productId' element={<Single />} />
      <Route path='products/new' element={<NewProduct />} />
      <Route path='products/:productId/edit' element={<EditProduct />} />
      <Route path='orders' element={<OrderPage />} />
      <Route path='orders/details/:id' element={<OrderDetail />} />
      <Route path='orders/order-bill/:id' element={<OrderBill />} />
      <Route path='categories' element={<CategoryList />} />
      <Route path='categories/details/:id' element={<CategoryDetail />} />
      <Route
        path='categories/details/:id/products'
        element={<CategoryProducts />}
      />
      <Route path='categories/new' element={<NewCategory />} />
      <Route path='subcategories' element={<SubCategoryList />} />
      <Route path='subcategories/details/:id' element={<SubCategoryDetail />} />
      <Route
        path='subcategories/details/:id/products'
        element={<SubCategoryProducts />}
      />
      <Route path='subcategories/new' element={<NewSubCategory />} />
    </Routes>
  </BrowserRouter>
);

export default App;
