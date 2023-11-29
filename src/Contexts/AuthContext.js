import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth } from "../Utils/firebase";
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            setUser(userAuth)
            setLoading(false)
            if (user) navigate('/chats')


        })
    }, [navigate, user])
    const value = { user, loading }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}