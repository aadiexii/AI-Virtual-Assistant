import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../contextApi/userContext'
import { redirectDocument, useNavigate } from 'react-router-dom'
import axios from 'axios'
import geminiResponse from '../../../backend/gemini'
import aiImage from '../assets/ai.gif'
import userImage from '../assets/user.gif'
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";

const Home = () => {  
  const {userData, serverUrl, setuserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const synth = window.speechSynthesis   
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const isRecognizingRef = useRef(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [ham, setHam] = useState(false)
   
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
   
  const startRecognition = () => {
      if(!isRecognizingRef.current && !isSpeakingRef.current){
        try {
          recognitionRef.current?.start()
        } catch (error) {
          if(error.name !== "InvalidStateError"){
            console.error("Start Error:", error)
          }
        }
      }
  }

        const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'hi-IN'
      const voices = window.speechSynthesis.getVoices()
      const hindiVoice = voices.find(v => v.lang === 'hi-IN')
      if(hindiVoice){
        utterance.voice = hindiVoice
      }

      isSpeakingRef.current = true;
      setIsAiSpeaking(true)
      setAiText(text)

      utterance.onend = () => {
        setIsAiSpeaking(false)
        setAiText("")
        isSpeakingRef.current = false;
        setTimeout(() => {
          startRecognition()
        }, 800)
      }  
      synth.cancel()
      synth.speak(utterance)
    }

  const handleCommand = (data) => {
    const {type, userInput, response} = data
    speak(response)

    if(type == 'google_search'){
      const query = encodeURIComponent(userInput)
      window.open(`https://www.google.com/search?q=${query}`,
      '_blank')
    }

    if(type == 'calculator_open'){
      window.open(`https://www.google.com/search?q=calculator`,
      '_blank')
    }

    if(type == 'instagram_open'){
      window.open(`https://www.instagram.com`,
      '_blank')
    }
    if(type == 'facebook_open'){
      window.open(`https://www.facebook.com`,
      '_blank')
    }
    if(type == 'weather_show'){
      window.open(`https://www.google.com/search?q=weather`,
      '_blank')
    }
    if(type == 'youtube_search' || type == 'youtube_play'){
      const query = encodeURIComponent(userInput)
      window.open(`https://www.youtube.com/results?search_query=${query}`,
      '_blank')
    }
  }

  useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous=true
      recognition.lang='en-US'
      recognition.interimResults = false;

      recognitionRef.current = recognition

      let isMounted = true

      const startTimeout = setTimeout(() => {
        if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){
          try {
            recognition.start()
          } catch (error) {
            if(error.name !== "InvalidStateError"){
              console.error(e)
            }
          }
        }
      }, 1000)

      recognition.onstart = () => {
        isRecognizingRef.current = true
        setListening(true)
      }

      recognition.onend = () => {
        isRecognizingRef.current = false
        setListening(false)    
        
      if(isMounted && !isSpeakingRef.current){
          setTimeout(() => {
            if(isMounted){
              try {
                recognition.start()
              } catch (error) {
                if(error.name !== "InvalidStateError"){
                  console.error(error)
                }
              }
            }
          }, 1000)
        }
      }

      recognition.onerror = (event) => {
        console.warn("recognition error", event.error)
        isRecognizingRef.current = false
        setListening(false)

        if(event.error !== 'aborted' && isMounted && !isRecognizingRef.current){
          setTimeout(() => {
             if(isMounted){
              try {
                recognition.start();
              } catch (error) {
                  if(error.name !== "InvalidStateError") console.log(error)
              }
             }
          }, 1000)
        }
      }

      recognition.onresult=async (e) => {
         const resultTranscript = e.results[e.results.length-1][0].transcript.trim()

         if(resultTranscript.toLowerCase().includes(userData.assistantName.toLowerCase())){
          setAiText("")
          setUserText(resultTranscript)
            recognition.stop()
            isRecognizingRef.current = false
            setListening(false)
          const data = await getGeminiResponse(resultTranscript)
            handleCommand(data)
            setAiText(data.response)
            setUserText("")
         }
      }
      
        const greeting = new SpeechSynthesisUtterance(`Hello ${userData.assistantName}, what can I help u with?`)
        greeting.lang = 'hi-IN'
        window.speechSynthesis.speak(greeting)


      return () => {
        isMounted = false
        clearTimeout(startTimeout)
        recognition.stop()
        setListening(false)
        isRecognizingRef.current = false
        // clearInterval(fallback)
      }
  }, []) 


  return (
    <div className='w-full h-[100vh] overflow-hidden bg-gradient-to-t from-[black] to-[#0a0a6b] flex justify-center items-center flex-col gap-[15px] '> 
        <RiMenuUnfold4Fill className='lg:hidden text-white absolute top-[20px] right-[20px] w-[30px] h-[30px]' onClick={() => {setHam(true)}}/>
        <div className={`lg:hidden fixed inset-0 z-50 bg-[#000000dd] backdrop-blur-lg p-[40px] flex flex-col gap-[20px] transform ${ham?"translate-x-0": "translate-x-full"} transition-transform`}>
        <RiMenuFold4Fill className='lg:hidden text-white absolute top-[20px] right-[20px] w-[30px] h-[30px] items-start' onClick={() => {setHam(false)}}/>
                <button className='min-w-[130px] h-[50px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer' onClick={() => {
             handleLogout()
        }}>Logout</button>
        <button className='min-w-[130px] h-[50px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer' onClick={() => {
          navigate('/customize')
        }}>Customize</button>

        <div className='w-full h-[2px] bg-gray-400'></div>
        <h1 className='text-blue-500 font-bold text-[19px] text-center'>History</h1>
          <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col truncate'>
                {Array.isArray(userData.history) && userData.history.map((his, idx) => (
        <span key={idx} className='text-gray-200 text-[18px] w-full h-[30px]'>
          {his}
  </span>
))}
          </div>
     
        </div>
        <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
            <img src={userData?.assistantImage} alt='' className='h-full object-cover'/>
        </div>
        <h1 className='text-white text-[18px] font-semibold'>I am <span className='text-blue-500'>{userData.assistantName}</span>
        </h1>
        <button className='min-w-[130px] h-[50px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] absolute top-[10px] right-[20px] cursor-pointer hidden lg:block' onClick={() => {
             handleLogout()
        }}>Logout</button>
        <button className='min-w-[130px] h-[50px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] absolute top-[80px] right-[20px] cursor-pointer hidden lg:block' onClick={() => {
          navigate('/customize')
        }}>Customize</button>
      <img 
        src={isAiSpeaking ? aiImage : userImage} 
        className='w-[200px]' 
        alt={isAiSpeaking ? "AI speaking" : "User listening"} 
      />

        <h1 className="text-white text-[18px] font-bold">
          {userText ? userText : (aiText ? aiText : null)}
        </h1>

    </div>
  )
} 

export default Home
