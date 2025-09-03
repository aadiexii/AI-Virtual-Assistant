import React, { useContext, useState } from 'react'
import bg from '../assets/Background.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../contextApi/userContext';
import axios from 'axios'


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {serverUrl} = useContext(userDataContext)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
 
  const handleSignup = async(e) => {
    e.preventDefault()
    setErr("");
    setLoading(true)
    try{
      let result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name, email, password
      },{withCredentials: true})
        console.log(result.data)
        setLoading(false)
    }catch(error){
        console.log(error)
        setLoading(false)
        setErr(error.response?.data?.message || "Something went wrong");
     }
  }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' 
      style={{backgroundImage: `url(${bg})`}}>
        <form className='w-[90%] h-[600px] max-w-[500px] bg-[#0000003a] backdrop-blur shadow-lg shadow-blue-950 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignup}>
             <h1 className='text-white text-[30px] font-semibold mb-[30px]'>SignUp to <span className='text-blue-400'>Virtual Assistant</span></h1>
             <input type='text' placeholder='Enter Your Name' className='w-full h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]' required onChange={(e) => setName(e.target.value)} value={name}/>
             <input autoComplete="username" type='email' placeholder='Enter Your Email' className='w-full h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email}/>
             <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
                 <input autoComplete="new-password" type={showPassword?"text": "password"} placeholder='Enter Your Password' className='w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-[20px] py-[20px]' required onChange={(e) => setPassword(e.target.value)} value={password}/>

                 {!showPassword && <FaEye className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(true)}/>}
                
                 {showPassword && <FaEyeSlash className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(false)}/>}
             </div>
             
             {err.length>0 && <p className='text-red-700'>
                  *{err}
              </p>}
             <button className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px]' disabled={loading}>{loading? "Loading...": "Sign Up"}</button>
             
             <p className='text-white text-[18px]'>Already have an account ? <span className='text-blue-400 cursor-pointer underline' onClick={() => navigate('/signin')}>Sign In</span></p>
        </form>
    </div>
  )
}

export default SignUp
