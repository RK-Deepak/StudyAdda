import React from 'react'
import Tempelate from '../components/main/Auth/Tempelate'
import maharana from "../assets/Images/maharana.jpg"

const Signup = () => {
  return (
   <Tempelate
     title="Join the life changing coding journey for free with StudyAdda"
     description1="Build skills and confidence and join life marathon "
     description2="Education to become Maharan Pratap of Your Career."
     image={maharana}
     formType="signup"
   />
  )
}

export default Signup