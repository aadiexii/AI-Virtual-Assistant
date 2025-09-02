import React from 'react'
import SignUp from './pages/signup.jsx'
import {Routes, Route} from 'react-router-dom'
import SignIn from './pages/signin.jsx'

const App = () => {
  return (
      <Routes>
         <Route path='/signup' element={<SignUp/>} />
         <Route path='/signin' element={<SignIn/>} />
      </Routes>
  )
}

export default App
