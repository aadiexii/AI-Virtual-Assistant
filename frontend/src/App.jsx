import React from 'react'
import SignUp from './pages/signup.jsx'
import {Routes, Route, Navigate} from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import Customize from './pages/Customize.jsx'
import { useContext } from 'react'
import { userDataContext } from './contextApi/userContext.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  const {userData, setuserData} = useContext(userDataContext)
  return (
      <Routes>
         <Route path='/' element={!userData? <Navigate to={"/signin"}/> : (!userData.assistantImage || !userData.assistantName) ? <Navigate to={"/customize"}/> : <Home/>} />
         <Route path='/signup' element={!userData?<SignUp/>: <Navigate to={'/'}/>} />
         <Route path='/signin' element={!userData?<SignIn/>: <Navigate to={'/'}/>} />
         <Route path='/customize' element={userData?<Customize/>: <Navigate to={'/signin'}/>} />
      </Routes>
  )
}

export default App
