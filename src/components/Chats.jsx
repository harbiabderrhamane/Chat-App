import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../Utils/firebase'
import { signOut } from 'firebase/auth'
import axios from 'axios'
import { AuthContext } from '../Contexts/AuthContext'

function Chats() {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [loading,setLoading]= useState(true)


    const handleLogout = async() => {
        await signOut(auth)
        navigate('/')
    }
    const getFile = async(url) => {
        const response = await fetch(url)
        const data = await response.blob()
        // blobs are usually images or any type of files we wanna transfer it into a binary format and it contain our image
        // in this object we have the data the name of the and the type of it 
        return new File([data],"userPhoto.jpeg", {type:'image/jpeg'})
    }
    useEffect(()=> {
     if(!user) {
      navigate('/')
      return;
    }
    // now here we are making a call to the cat engine
    // we are getting the already created user to show it to chat engine
    axios.get('https://api.chatengine.io/users/me', {
        headers: {
           " project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
           " user-name" : user.email,
           " user-secret" : user.uid
        }
    }).then(()=> {
        setLoading(false)
    }).catch(()=> {
        let formData = new FormData()
        formData.append('email',user.email)
        formData.append('username',user.email)
        formData.append('secret',user.uid)
        getFile(user.photoURL)
        .then((avatar) => {
            formData.append('avatar',avatar,avatar.name)
            axios.post('https://api.chatengine.io/users/',formData,
                {headers: {"private-key" :process.env.REACT_APP_CHAT_ENGINE_KEY}}
            )
            .then(()=> setLoading(false))
            .catch(error => console.log(error))
        })
// now we need to make a final call to chat engine and we are gonna use the post method to create a new file
    })
    },[user,navigate])
    if(!user || loading) return '...Loading'
  return (
    <div className='chats-app'>
        <div className='nav-bar'>
            <div className='logo-tab'>Chat App</div>
            <div className='logout-tab' onClick={handleLogout}>Logout</div>
        </div>
        <ChatEngine
        height='calc(100vh-66px)'
        projectID= {process.env.REACT_APP_CHAT_ENGINE_ID}
        // WE NEED TO MAKE SURE WE ARE GRABBING DATA FROM THE LOGIN OR FACEBOOK LOGIN
        // NOW WE ARE GOING TO USE THE DATA COMING FROM THE SOCIAL FIREBASE LOGIN AND PEAR IT WITH MAKING API CALLS TO CHAT ENGINE TO CREATE THE USERS
        userName={user.email}
        userSecret={user.uid}
/>
    </div>
  )
}

export default Chats