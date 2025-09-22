import React, { useContext, useRef, useState } from 'react'
import Image1 from '../assets/Image1.png'
import Image2 from '../assets/Image2.png'
import Image3 from '../assets/Image3.png'
import Image4 from '../assets/Image4.png'
import Image5 from '../assets/Image5.png'
import Image6 from '../assets/Image6.png'
import Image7 from '../assets/Image7.png'
import Card from '../Components/Card'
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../contextApi/userContext'
import { useNavigate } from 'react-router-dom'

const Customize = () => {
  const {serverUrl, userData, setuserData,frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage} = useContext(userDataContext)
const inputImage = useRef()
const navigate = useNavigate()

  const handleImage = (e) => {
      const file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0a0a6b] flex justify-center items-center flex-col p-[20px]'> 
      <h1 className='text-white text-[30px] text-center mb-[40px]'>Select Your <span className='text-blue-600'>Assistant Image</span></h1>
      <div  className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]">
          <Card image={Image1}/>
          <Card image={Image2}/>
          <Card image={Image3}/>
          <Card image={Image4}/>
          <Card image={Image5}/>
          <Card image={Image6}/>
         <Card image={Image7}/>
          <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]  bg-[#030326] border-2 border-[#0f0f5f] rounded-2xl overflow-hidden  hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white hover:border-4 flex items-center justify-center ${selectedImage=="input"? "border-white border-4 shadow-2xl shadow-blue-950": null}`} onClick={() => {
              inputImage.current.click()
              setSelectedImage("input")
              }}>

              {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px]' />}
              {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
               
          </div>
      <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage}/> 
      </div>              
        {selectedImage && <button className='min-w-[150px] cursor-pointer h-[60px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px]' onClick={()=>{navigate('/customize1')}}>Next</button>}
    </div>
  )
}

export default Customize
