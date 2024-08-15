import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Widget = ({type}) =>{
    //temp data
    let amount=100;
    let diff=20;
    let data;
    switch(type){
        case "user":
            data = {
                title:"USERS",
                isMoney:false,
                link:"See All Users",
                icon:(
                    <PersonOutlineIcon className='icon'/>
                )
            };
            break;
        case "order":
            data = {
                title:"ORDERS",
                isMoney:false,
                link:"See All Orders",
                icon:(
                    <ShoppingCartIcon className='icon'/>
                )
            };
            break;
        case "sales":
            data = {
                title:"SALES",
                isMoney:true,
                link:"View Net Sales",
                icon:(
                    <AttachMoneyIcon className='icon'/>
                )
            };
            break;
        case "product":
            data = {
                title:"PRODUCTS",
                isMoney:false,
                link:"View All Products",
                icon:(
                    <InventoryIcon className='icon'/>
                )
            };
            break;
            default:
                break;
            
    }
    return(
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon/>{diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
}
export default Widget;