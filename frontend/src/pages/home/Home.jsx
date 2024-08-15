import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Table from "../orders/OrderList";
const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        {/* <div className='widgets'>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='sales' />
          <Widget type='product' />
        </div> */}
        <div className='listContainer'>
          <div className='lisTitle'>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
