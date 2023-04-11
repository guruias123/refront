import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../StyleSheets/dashboard.css'
import Logo from '../Assets/logo white.png'
import Navbar from "./Navbar/Navbar";

const Dashboard = () => {
    const token = localStorage.getItem('token');
    const naviagte = useNavigate();
    useEffect(() => {
        if(!token) {
            naviagte('/signin')
        }
    }, [])

    return ( 
        // <Link to="/dashboard/create-smart-card">
        <div className="Dashboard">
            {/* <div className="dashboard-container">
                <div className="left">
                    <img src={Logo} />
                    <p>Home</p>
                </div>
                <div className="right">
                <Link to="/dashboard/account">Account</Link>
                <Link to="/dashboard/files">Files</Link>
                <button className="logout" onClick={(e) => handleClick(e)}>Logout</button>
                </div>
            </div> */}
            <Navbar  />
            {/* <Link to="/dashboard/create-resume">Resume</Link> */}
            {/* <Link to="/dashboard/web-resume">Web Resume</Link> */}
            <Link className="create-card" to="/dashboard/create-smart-card">
            <div >
            <Link to="/dashboard/create-smart-card">Build Your Smart Card</Link>
            </div>
            {/* <Link to="/dashboard/logout">Logout</Link> */}
            {/* <Link to="/dashboard/account">Account</Link>
            <Link to="/dashboard/files">Files</Link>
            <button onClick={(e) => handleClick(e)}>Logout</button> */}
        </Link>
        </div>
     );
}
 
export default Dashboard;