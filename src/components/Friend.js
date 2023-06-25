import {React, useState} from 'react'
import {faHeartCrack, faMessage} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export default function Friend({username, myId, isLogged, setLogged, loggedUser, setLoggedUser,setMessages,setClick,setFriend}) {
  const [isClicked, setClicked] = useState(false)

  const removeFriend = () => {
    axios.post('https://api.notagram.onrender.com/api/users/removeFriend?_method=PUT', {
        id: myId,
        username: username
    }).then( res => {
      alert(res.data.message)
      setClick(false)
      setClicked(true)
      }).catch(error=>{
      alert(error.response.data.message)
      axios.get('https://api.notagram.onrender.com/auth/check')
          .then((response)=>{
          console.log(isLogged)
          console.log(response)
          setLogged(error.response.data.isLogged)
          setLoggedUser(error.response.data.user)
        })
    })
}

const apriChat = () => {
  axios.get(`https://api.notagram.onrender.com/api/messages/getMessages/${loggedUser.id}/${myId}`).then( res => {
    console.log(res.data);
    setMessages(res.data);
    setClick(true);
    setFriend({user:username,id:myId})
    }).catch(error=>{
    alert(error.response.data.message)
    axios.get('https://api.notagram.onrender.com/auth/check')
        .then((response)=>{
        console.log(isLogged)
        console.log(response)
        setLogged(error.response.data.isLogged)
        setLoggedUser(error.response.data.user)
      })
  })
}


  return (
    <>
    {isClicked ? <> </> :   
        <div className="userCard">
        <p><img alt="profile" src="user.png" width="50px" heght="50px" /> <span className="user"> {username} </span></p>
        <button className="button" onClick={apriChat}> <span> Apri chat </span><FontAwesomeIcon icon={faMessage} /></button>
        <button className="button" onClick={removeFriend} > <span> Rimuovi amico </span> <FontAwesomeIcon icon={faHeartCrack} /></button>
        </div> 
    }
   </>
   )
}

