import React from 'react'
import SignUp from './pages/SignUp.jsx'
import {Routes, Route, Navigate} from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import Customize from './pages/Customize.jsx'
import Customize1 from './pages/Customize1.jsx'
import { useContext } from 'react'
import { userDataContext } from './contextApi/userContext.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  const {userData, setuserData, isLoading} = useContext(userDataContext)
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-t from-[black] to-[#0a0a6b]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }
  
  return (
      <Routes>
        <Route path='/' element={(userData?.assistantName && userData?.assistantImage)? <Home/> : <Navigate to={'/customize'}/>}/>
         <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={'/customize'}/>} />
         <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={'/'}/>} />
         <Route path='/customize' element={userData?<Customize/>:<Navigate to={'/signup'}/>} />
         <Route path='/customize1' element={userData?<Customize1/>:<Navigate to={'/signup'}/>} />
      </Routes>
  )
}

export default App
