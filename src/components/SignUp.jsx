import React from 'react'
import { GoogleOutlined } from '@ant-design/icons'
import { auth } from '../Utils/firebase'
import {  GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

function SignUp() {
    return (
        <div id='login-page'>
            <div id='login-card'>
              <h2>Welcome to ChatApp</h2>
              <div className='login-button google' onClick={()=> signInWithRedirect(auth, new GoogleAuthProvider())}>
                <GoogleOutlined/> Sign In With Google
              </div>
             
            </div>
        </div>
      )
}

export default SignUp

