import React, { useContext } from 'react'
import { userDataContext } from '../contextApi/userContext'

const Card = ({image}) => {
  const {serverUrl, userData, setuserData,frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage} = useContext(userDataContext)

  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0f0f5f] rounded-2xl overflow-hidden  hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white hover:border-4 ${selectedImage==image? "border-white border-4 shadow-2xl shadow-blue-950": null}`} onClick={() => {
          setSelectedImage(image)
          setBackendImage(null)
          setFrontendImage(null)
        }
      }><img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card
