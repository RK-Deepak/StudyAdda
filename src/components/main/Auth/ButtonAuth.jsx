import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { MdPlusOne } from 'react-icons/md'

const ButtonAuth = ({title,categorySpecific}) => {


  return (
   <button
    type="submit"
    className={`mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] ${categorySpecific &&  "flex gap-2 items-center   font-bold font-inter text-richblack-400"}  `}
  >
    {categorySpecific &&<MdPlusOne/>}
    {title}
  </button>)
  
}

export default ButtonAuth