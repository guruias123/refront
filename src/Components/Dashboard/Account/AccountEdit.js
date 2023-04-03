import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../../StyleSheets/AccountEdit.css'
import '../../StyleSheets/form.css'

const AccountEdit = () => {
  const navigate = useNavigate();
    const {id} = useParams()
    console.log(id);
    const [user, setUser] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')

    useEffect(() => {
        setFirstName(localStorage.getItem('fName'))
        setLastName(localStorage.getItem('lName'))
        setDob(localStorage.getItem('dob'))
    }, [])

    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.put(`${process.env.REACT_APP_API}/userupdate/${id}`, {firstName,lastName,dob})
      .then(res => {
        console.log("User updated successfully", res.data);
        navigate('/dashboard/account');
      })
      .catch(err => {
        console.log("err",err);
      })
    }
    
  return (
    <div className='accountedit-container'>
      {/* onSubmit={(e) => {handleSubmit(e)}} */}
      <form onSubmit={(e) => {handleSubmit(e)}}>
      <p>{user.firstName}</p>
        <input  type='text' value={firstName} onChange={(e) => {setFirstName(e.target.value)} } />
        <input  type='text' value={lastName} onChange={(e) => {setLastName(e.target.value)} } />
        {/* <input value={user.email} readOnly  /> */}
        <input  type='text' value={dob} onChange={(e) => {setDob(e.target.value)} } />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AccountEdit