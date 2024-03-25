import React from 'react'
import Sidebar from '../components/main/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

import { useState } from 'react';

const Dashboard = ({setShowConfirmationModel}) => {
  
  return (
    <>
    <div className='flex'>
        <Sidebar setShowConfirmationModel={setShowConfirmationModel}/>
        <Outlet/>
    </div>
  
    </>
  )
}

export default Dashboard