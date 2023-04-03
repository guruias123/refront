import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../StyleSheets/dashboard.css'
const Dashboard = () => {
    const token = localStorage.getItem('token');
    const naviagte = useNavigate();
    useEffect(() => {
        if(!token) {
            naviagte('/signin')
        }
    }, [])

    const handleClick = (e) =>{
        e.preventDefault()
        localStorage.clear()
        naviagte('/')
    }
    return ( 
        <div className="Dashboard">
            {/* <Link to="/dashboard/create-resume">Resume</Link> */}
            {/* <Link to="/dashboard/web-resume">Web Resume</Link> */}
            <Link to="/dashboard/create-smart-card">Smart Card</Link>
            <Link to="/dashboard/account">Account</Link>
            <Link to="/dashboard/files">Files</Link>
            {/* <Link to="/dashboard/logout">Logout</Link> */}
            <button onClick={(e) => handleClick(e)}>Logout</button>
        </div>
     );
}
 
export default Dashboard;