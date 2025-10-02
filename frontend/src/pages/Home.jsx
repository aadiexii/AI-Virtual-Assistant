import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../contextApi/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {  
  const {userData, serverUrl, setuserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()
   
  const handleLogout = async() => {
      try {
        const result = await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials: true})
        setuserData(null)
        navigate("/signin")
      } catch (error) {
        setuserData(null)
         console.log(error)
      }
  }

      const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
         speechSynthesis.speak(utterance);
  }

  useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.lang = 'en-US'
      
      recognition.onresult = async (e) => {
        const transcript = e.results[e.results.length-1][0].transcript.trim()
        console.log(transcript)

        if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
          const data = await getGeminiResponse(transcript)
          console.log(data)
          speak(data.response)
        }
      }
      recognition.start()
    
  }, [])

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0a0a6b] flex justify-center items-center flex-col gap-[15px] relative'> 
        <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
            <img src={userData?.assistantImage} alt='' className='h-full object-cover'/>
        </div>
        <h1 className='text-white text-[18px] font-semibold'>I am <span className='text-blue-500'>{userData.assistantName}</span>
        </h1>
        <button className='min-w-[130px] h-[50px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] absolute top-[10px] right-[20px] cursor-pointer' onClick={() => {
             handleLogout()
        }}>Logout</button>
        <button className='min-w-[130px] h-[50px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] absolute top-[80px] right-[20px] cursor-pointer' onClick={() => {
          navigate('/customize')
        }}>Customize</button>
    </div>
  )
} 

export default Home
