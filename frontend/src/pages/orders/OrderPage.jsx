import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OrderList from "./OrderList";
import "./orderPage.scss";
const OrderPage = () => {
  return (
    <div className='order-container'>
      <Sidebar />
      {/* <Navbar /> */}
      <div className='list'>
        <OrderList />
      </div>
    </div>
  );
};
export default OrderPage;
