import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VIdeoCall = () => {

    const [roomId,setroomId]=useState("");
    const navigate=useNavigate();
    const {user}=useSelector((store)=>store.profile)

    const submitHandler=(e)=>
    {
        e.preventDefault();
        navigate(`/peerToPeer/videoCall/${Date.now().toString()}/${roomId}`);
        setroomId("");

    }

  return (
    <div className='text-white mx-auto font-inter my-7 flex flex-col gap-2  p-4 items-center border border-richblack-100 w-[80%] max-w-[600px] rounded-md bg-richblack-800'>
        <h1 className=' text-richblack-100 text-center text-2xl md:text-3xl underline underline-offset-1 font-bold'>Grow Together With Your Peer</h1>
        <p className=' text-yellow-25 text-sm font-medium  underline underline-offset-1 text-center'>Let's Solve Problem Together</p>
        <div className=' text-center '>
          
            <form onSubmit={submitHandler} className='flex flex-col gap-1 items-center'>
            <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Enter Room Id: <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="room"
          value={roomId}
          onChange={(e)=>setroomId(e.target.value)}
          placeholder="Ex:1234.."
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
        />
      </label>
            <button title='Join Room' type='submit' className='py-[4px] px-2 my-2 text-white w-fit bg-yellow-50 font-bold rounded-md'>Join Room</button> 
            </form>
        </div>
    </div>
  )
}

export default VIdeoCall