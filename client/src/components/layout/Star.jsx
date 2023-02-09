import React from 'react';
import{FaStar,FaStarHalfAlt} from "react-icons/fa"
import {AiOutlineStar} from "react-icons/ai"

const Star =({stars})=>{
  const ratingStar=Array.from({length:5},(element,index)=>{
    let number=index +1
return <span key={index} >
        {stars >=index+1
        ? <FaStar className='icon'></FaStar>
        : stars >=number
        ? <FaStarHalfAlt className='icon'></FaStarHalfAlt>
        :<AiOutlineStar></AiOutlineStar>}
</span>
 
  })
  return <div className='icon-style content-center grid grid-cols-5 gap-1'>
    {ratingStar}
    
  </div>
}
export default Star;