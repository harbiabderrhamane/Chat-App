import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import { AuthProvider } from './Contexts/AuthContext'
import Chats from './components/Chats'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={< SignUp />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App