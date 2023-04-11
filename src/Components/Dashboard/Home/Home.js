import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import '../../StyleSheets/dashboard.css'
import Logo from '../../Assets/logo white.png'

const Home = () => {
    const [popup, setPopup] = useState(true)
    const token = localStorage.getItem('token');
    const naviagte = useNavigate();
    const handleClick = () => {
        naviagte('/dashboard/create-smart-card')
    }

    const handleClick2 = () => {
        naviagte('/home')
    }

    const handleClick1 = (e) =>{
        e.preventDefault()
        localStorage.clear()
        naviagte('/')
    }

    useEffect(() => {
        if(!token) {
            naviagte('/signin')
        }
    }, [])

    // const handleChange = () => {

    // }

    const [searchQuery, setSearchQuery] = useState('');

    const items = [
        // { id: 1, name: 'Smart Card' },
        // { id: 2, name: 'Account' },
        // { id: 3, name: 'Files' },
        { id: 1, name: 'Smart Card', type: 'item' },
        { id: 2, name: 'Account', type: 'link', to: '/dashboard/account' },
        { id: 3, name: 'Files', type: 'link', to: '/dashboard/files' },
        // { id: 4, name: 'Dashboard', type: 'item' },
        // { id: 5, name: 'Profile', type: 'item' },
        { id: 4, name: 'Logout', type: 'button', onClick: handleClick1 },
      ];
    
      const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
      };
    
      const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    const popupHandle = () => {
        setPopup(false)
    }
    return ( 
        // <div className="Dashboard">
        <>
        {popup && popup === true ?
        <div className="popup">
            <div className="popup-left">
                <p>This site is in beta version, while accessing the site, you may face some errors</p>
                <p>You can submit the details <a href="#">here</a>, it would be fixed in 48 hrs</p>
            </div>
            <div className="popup-right">
                <button onClick={popupHandle}>ok</button>
            </div>
        </div> : <p style={{"display":"none"}}></p>}
            <div className="dashboard-container home-page new-home">
                <div className="left">
                    <img src={Logo} onClick={handleClick2} />
                </div>
                <div className="right">
                {/* <input type='text' placeholder="Search here..." onChange={(e) => handleChange(e)} /> */}
                <input type='text' placeholder="Search here..." value={searchQuery} onChange={handleSearchInputChange} />
                </div>
            {/* </div> */}
           
        </div>
        <div className="items">
        {filteredItems.map((item) => {
          switch (item.type) {
            case 'item':
              return (
                <p style={{"cursor":"pointer"}} key={item.id} onClick={() => handleClick()}>
                  {item.name}
                </p>
              );
            case 'link':
              return (
                <Link key={item.id} to={item.to}>
                  {item.name}
                </Link>
              );
            case 'button':
              return (
                <button key={item.id} className="logout" onClick={item.onClick}>
                  <Icon icon="material-symbols:logout" />
                  {item.name}
                </button>
              );
            default:
              return null;
          }
        })}
        {/* {filteredItems.map((item) => (
          <p key={item.id} onClick={handleClick}>{item.name}</p>
        ))} */}
        {/* <p onClick={handleClick}>Smart Card</p>
        <Link to="/dashboard/account">Account</Link>
        <Link to="/dashboard/files">Files</Link>
        <button className="logout" onClick={(e) => handleClick1(e)}><Icon icon="material-symbols:logout" />Logout</button> */}
        </div>
        </>
     );
}
 
export default Home;