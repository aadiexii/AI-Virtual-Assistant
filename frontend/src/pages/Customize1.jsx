import React, { useState } from 'react'
import UserContext, { userDataContext } from '../contextApi/userContext'

const Customize1 = () => {
    const {userData} = UserContext(userDataContext)
    const [name, setName] = useState(userData?.name ||  "")
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0a0a6b] flex justify-center items-center flex-col p-[20px]'> 
      <h1 className='text-white text-[30px] text-center mb-[40px]'>Enter Your <span className='text-blue-600'>Assistant Name</span></h1>
      <input type='text' placeholder='Ex. Oh My Darling' className='w-full max-w-[600px] h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]' required onChange={(e) =>setName(e.target.value)} value={name}/>

      {name &&   <button className='min-w-[300px] cursor-pointer h-[60px] bg-white    rounded-full text-black font-semibold text-[19px] mt-[30px]' onClick={()=>{navigate('/customize1')}}>Create Your Assistant</button>}
    </div>
  )
}

export default Customize1