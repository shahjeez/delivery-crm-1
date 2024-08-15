import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
const Navbar = () =>{
    return (
      <div className="navbar">
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder='Search Here' />
                <SearchIcon />
            </div>
            <div className="items">
                <div className="item">
        <DarkModeOutlinedIcon/> 
                </div>
                <div className="item">
        <img src="/" alt="avatar" className='avatar' /> 
                </div>
            </div>
        </div>
      </div>
    );
}
export default Navbar;