import React, { useState } from 'react'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import RegisterForm from '../components/RegisterForm'

export default function Register({setLogged,setLoggedUser}) {
  const [signInfo, setSignInfo] = useState({username: '', password: ''})
  let navigate = useNavigate();
  
  axios.defaults.withCredentials=true

  const handleInfo = (e) => {
    setSignInfo({...signInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post( 'https://notgram-api.onrender.com/auth/register', {
      username: signInfo.username,
      password: signInfo.password
    }).then(r => {
      alert(r.data.message)
      axios.get('https://notgram-api.onrender.com/auth/check')
      .then((response)=>{
      
      setLogged(response.data.isLogged)
      setLoggedUser(response.data.user)
    })
      navigate('/home');
    }).catch( error => {
      alert(error.response.data.message)
      setSignInfo({username: '', password: ''})
      
    } );
  }

  return (
    <RegisterForm
    handleSubmit = {handleSubmit}
    handleInfo = {handleInfo}
    signInfo = {signInfo}
    />
    
  )
   

};


