import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { deleteAccount } from '../../../../services/operations/SettingsAPI';

const DeleteAccount = () => {

    const {token}=useSelector((store)=>store.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    function handleDeleteAccount()
    {
        try 
        {
              dispatch(deleteAccount(token,navigate))
        }
        catch(error)
        {
            console.log("Error Message - ",error.message)
        }
    }


  return (
    <>
    <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-red-900 p-8  w-full">
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FaTrashAlt className="text-3xl text-pink-200" />
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>
        <div className="w-4/5 text-pink-25">
          <p>Are u sure u want to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
        </div>
        <button
          type="button"
          className="w-fit cursor-pointer italic font-inter font-bold text-richblack-900"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  </>
  )
}

export default DeleteAccount