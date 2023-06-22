import React from 'react'
import {Link} from "react-router-dom"
import { faUser, faHome, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = ({isLogged,setLogged,loggedUser,setLoggedUser}) => {
  const navigate = useNavigate()

  axios.defaults.withCredentials=true

  const logoutHandler = ()=>{
    axios.post('https://notgram-api.onrender.com/auth/logout',{})
    .then(response=>{
      alert(response.data.message)
        axios.get('https://notgram-api.onrender.com/auth/check')
          .then((response)=>{
          
          setLogged(response.data.isLogged)
          setLoggedUser(response.data.user)
        })
        navigate('https://notgram-api.onrender.com/login');  
    }).catch(error=>{
      alert(error.response.data.message)
      axios.get('https://notgram-api.onrender.com/auth/check')
          .then( ()=>{
          
          setLogged(error.response.data.isLogged)
          setLoggedUser(error.response.data.user)
        })
    })
  }

  return (
    <nav>
      <div className="infoUser"> 
        <img className="logo" alt="Logo web-app" src="logo192.png"/> 
            {isLogged && <span className="username"> Bentornato {loggedUser.username} </span> }
      </div>  
      <ul>
        <li><FontAwesomeIcon icon={faHome} /><Link className="navLink" to="/home">Home</Link></li>
        <li><FontAwesomeIcon icon={faUserGroup} /><Link className="navLink" to="/chats">Lista chat</Link></li>
        <li onClick={logoutHandler}><FontAwesomeIcon icon={faUser} /><Link className="navLink" to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
