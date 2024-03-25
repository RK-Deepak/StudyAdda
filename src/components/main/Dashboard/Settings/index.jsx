import React from 'react'
import ChangeProfileImage from './ChangeProfileImage'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

export default function Settings()
{
    return (
        <div className='flex flex-col gap-4 w-full max-w-[900px] mx-auto p-5'>
         <div className='flex gap-2 flex-col'>
                <p className='text-white text-sm'>Home/Dashboard/EditProfile</p>
                <h1 className='text-white  text-2xl '>Edit Profile</h1>
            </div>
            <ChangeProfileImage/>
            <EditProfile/>
            <UpdatePassword/>
            <DeleteAccount/>
        </div>
    )
}