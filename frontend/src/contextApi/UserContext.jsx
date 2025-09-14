import React, { createContext, useEffect, useState } from 'react'
export const userDataContext = createContext()
import axios from 'axios'

const UserContext = ({children}) => {
    const serverUrl = "http://localhost:8000"
    const [userData, setuserData] = useState(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleCurrentUser = async () => {
      try{
        const result = await axios.get(`${serverUrl}/api/currentuser`, {
              withCredentials: true
        })
        setuserData(result.data)
        console.log(result.data)
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
        handleCurrentUser
    }, [])
    const value = {
          serverUrl, userData, setuserData,frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage
    }

  return (
    <userDataContext.Provider value= {value}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext
