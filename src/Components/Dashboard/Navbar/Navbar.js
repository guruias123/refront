import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import '../../StyleSheets/dashboard.css'
import Logo from '../../Assets/logo white.png'

const Navbar = ({handleSubmit}) => {
    const naviagte = useNavigate();
    const handleClick = () => {
        naviagte('/dashboard/create-smart-card')
    }

    const handleClick1 = (e) =>{
        e.preventDefault()
        localStorage.clear()
        naviagte('/')
    }

    const handleClick2 = (e) =>{
        e.preventDefault()
        naviagte('/home')
    }
    
    return ( 
        // <div className="Dashboard">
            <div className="dashboard-container home-page">
                <div className="left">
                    <img src={Logo} onClick={handleClick2} />
                    <p onClick={handleClick}>Smart Card</p>
                </div>
                <div className="right">
                <Link to="/dashboard/account">Account</Link>
                <Link to="/dashboard/files">Files</Link>
                <button className="logout" onClick={(e) => handleClick1(e)}><Icon icon="material-symbols:logout" />Logout</button>
                </div>
            {/* </div> */}
           
        </div>
     );
}
 
export default Navbar;