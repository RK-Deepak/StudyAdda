import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const ButtonAuth = ({title,userExisted}) => {


  return (
   <button
    type="submit"
    className={`mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 `}
  >
    {title}
  </button>)
  
}

export default ButtonAuth