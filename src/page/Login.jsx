import React from 'react'
import Tempelate from '../components/main/Auth/Tempelate'
import guru from "../assets/Images/guru.jpg"

const Login = () => {
  return (
    <Tempelate
    title="Sat Shri Akal..."
    description1="Let's start the journey with guru blessing"
    description2=" to future-proof of your career"
    image={guru}
    formType="login"
   />
  )
}

export default Login