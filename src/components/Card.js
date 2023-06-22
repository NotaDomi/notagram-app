import React, { useState } from 'react' 
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export default function Card ({ username, myId, setLoggedUser, setLogged }) {
    const [isClicked, setClicked] = useState(false)

    const addFriend = () => {
        axios.post('/api/users/addFriend?_method=PUT', {
            id: myId,
            username: username
        }).then( res => {
            alert(res.data.message)
            setClicked(true)
        }).catch(error=>{
            alert(error.response.data.message)
            axios.get('/auth/check')
                .then( ()=>{
                
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
              })
          })
    }

    return (
        <>
        {isClicked ? <> </> : <div className="userCard"> 
            <p> <img alt="profile" src="user.png" width="50px" heght="50px" /> <span className="user"> {username} </span> </p>
            <button className="button" onClick={addFriend} > <span> Aggiungi amico </span> <FontAwesomeIcon icon={faHeart} />  </button>
        </div>}
        </>
    )
    
}