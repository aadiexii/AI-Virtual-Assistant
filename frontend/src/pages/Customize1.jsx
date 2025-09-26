import React, { useContext, useState } from 'react'

import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { userDataContext } from '../contextApi/userContext'
import { MdArrowBack } from "react-icons/md";


const Customize1 = () => {
    const {userData,backendImage, selectedImage, serverUrl, setuserData} = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName ||  "")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleUpdateAssistant = async() => {
      setLoading(true)
      try {
        let formData = new FormData()
        formData.append('assistantName', assistantName)
        if(backendImage){
           formData.append('assistantImage', backendImage)
        }else{
          formData.append("imageUrl", selectedImage)
        }
        const result = await axios.post(`${serverUrl}/api/user/updateassistant`,formData, {withCredentials:true})
        setLoading(false)
        console.log(result.data)
        setuserData(result.data)
        navigate('/')
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0a0a6b] flex justify-center items-center flex-col p-[20px] relative'> 
    <MdArrowBack className='absolute text-white top-[30px] left-[30px] w-[25px] h-[25px] cursor-pointer' onClick={() => {
      navigate('/customize')
    }}/>
      <h1 className='text-white text-[30px] text-center mb-[40px]'>Enter Your <span className='text-blue-600'>Assistant Name</span></h1>
      <input type='text' placeholder='Ex. Oh My Darling' className='w-full max-w-[600px] h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]' required onChange={(e) =>setAssistantName(e.target.value)} value={assistantName}/>

      {assistantName &&   <button className='min-w-[300px] cursor-pointer h-[60px] bg-white    rounded-full text-black font-semibold text-[19px] mt-[30px]' disabled={loading} onClick={()=>{
        handleUpdateAssistant()
        }
      }>{!loading? "Create Your Assistant": "Loading"}</button>}
    </div>
  )
}
 
export default Customize1