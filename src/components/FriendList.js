import React from 'react'
import Friend from './Friend'

export default function FriendList({allFriends, setLogged, loggedUser, setLoggedUser, setMessages, setClick, setFriend }) {
  return (
    <div id="aside-friends">
          {allFriends.map( (friend,index) =>  <Friend username={friend.username} key={index} myId={friend._id} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser} setMessages={setMessages} setClick={setClick} setFriend={setFriend} /> )}
        </div>
  )
}

