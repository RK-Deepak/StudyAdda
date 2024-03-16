import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CodedButton = ({children,active,linkto}) => {
  return (
<Link to={linkto}>
    {children && <div className={`text-center flex gap-2  items-center text-[14px] px-6 py-3 rounded-md font-bold border border-white
    ${active?" text-black bg-green-500 " :"bg-richblack-800 text-white "} hover:scale-95  transition-all duration-150  shadow shadow-richblack-200 group w-fit` }>
    {children}
    <FaArrowRight className=' transition-all  group-hover:translate-x-2'/>
    </div>}
</Link>
  )
}

export default CodedButton