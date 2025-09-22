import React, { createContext, useEffect, useState } from 'react'
export const userDataContext = createContext()
import axios from 'axios'

const UserContext = ({children}) => {
    const serverUrl = "http://localhost:8000"
    const [userData, setuserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleCurrentUser = async () => {
      try{
        const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
              withCredentials: true
        })
        setuserData(result.data)
        console.log(result.data)
      }catch(error){
        console.log(error)
        // Clear user data if token is invalid or expired
        setuserData(null)
      }finally{
        setIsLoading(false)
      }
    }

    const logout = async () => {
      try{
        await axios.get(`${serverUrl}/api/auth/logout`, {
          withCredentials: true
        })
      }catch(error){
        console.log(error)
      }finally{
        setuserData(null)
        setFrontendImage(null)
        setBackendImage(null)
        setSelectedImage(null)
      }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])
    const value = {
          serverUrl, userData, setuserData, isLoading, logout, frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage
    }

  return (
    <userDataContext.Provider value= {value}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext
