import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../../StyleSheets/Account.css'

const Account = () => {
  const [users, setUsers] = useState("")
    useEffect(() => {
      console.log(localStorage.getItem('gmail'));
        axios.get(`${process.env.REACT_APP_API}/users`)
        .then(res => {
            console.log(res.data.users);
            res.data.users.map(user => {
              if(user.email === localStorage.getItem('gmail')){
                localStorage.setItem('id',user._id)
                localStorage.setItem('fName',user.firstName)
                localStorage.setItem('lName',user.lastName)
                localStorage.setItem('dob',user.dob)
                setUsers(user)
              }
            })
        })
    }, [])
    
  return (
    <div className='account-container'>
      Account Details
        <p>{users.firstName}</p>
        <p>{users.lastName}</p>
        <p>{users.email}</p>
        <p>{users.dob}</p>
        <Link to={'/updateUser/' + localStorage.getItem('id')}><button className='edit'>Edit</button></Link>
        </div>
  )
  
}

export default Account