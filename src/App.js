
import './App.css';
import React, {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Chats from './pages/Chats'


import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [isLogged, setLogged] = useState(false);
  const [loggedUser,setLoggedUser] = useState({username:'', id:''})

  const navigate = useNavigate()

  useEffect( () => { 
    
    axios.get('https://notgram-api.onrender.com/auth/check')
    .then((response)=>{
      console.log(isLogged)
      console.log(response)
      setLogged(response.data.isLogged)
      setLoggedUser(response.data.user)
    })
    
  }, [] )

  useEffect(()=>{
    console.log(loggedUser)
    console.log(isLogged)
    isLogged ? navigate('/home') : navigate('/login')
  },[isLogged])

return (
    <>
    
    <Routes>
      <Route path='/home' element={<Home isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>}/>
      <Route path="/register" element={<Register setLogged={setLogged} setLoggedUser={setLoggedUser}/>} />
      <Route path="/login" element={ <Login setLogged={setLogged} setLoggedUser={setLoggedUser}/> } />
      <Route path="/chats" element={ <Chats isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> } />
    </Routes>
    </>
  );
}

export default App;
