import React from 'react'
import { Link } from 'react-router-dom'

const CodedButton = ({children,active,linkto}) => {
  return (
<Link to={linkto}>
    <div className={`text-center text-[14px] px-6 py-3 rounded-md font-bold border border-white
    ${active?" text-black bg-green-500 " :"bg-richblack-800 "} hover:scale-95 transition-all duration-150  shadow shadow-richblack-200 ` }>
    {children}
    </div>
</Link>
  )
}

export default CodedButton