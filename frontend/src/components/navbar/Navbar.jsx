import "./navbar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import UserImage from "../../images/fantasy-3077928_640.jpg";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/auth/authContext";

const Navbar = () => {

    const { darkMode, toggle } = useContext(DarkModeContext);
    const { currentUser, logout } = useContext(AuthContext);

    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/login");

    }

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Arijitsocial</span>
                </Link>
                <HomeOutlinedIcon />
                {!darkMode
                    ?
                    <DarkModeOutlinedIcon onClick={toggle} />
                    :
                    <WbSunnyOutlinedIcon onClick={toggle} />
                }
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search.." />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className="user" onClick={() => setModalOpen(!modalOpen)}>
                    <img src={UserImage} alt="" />
                    <span>{currentUser.name}</span>
                    {modalOpen && <div className="modal">
                        <button onClick={handleLogout}>Logout</button>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default Navbar
