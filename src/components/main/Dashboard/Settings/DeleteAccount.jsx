import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteAccount } from '../../../../services/operations/SettingsAPI';
import ConfirmationModal from '../../common/ConfirmationModal2';

const DeleteAccount = () => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const deleteProfileAccount = (token) => {
    dispatch(deleteAccount(token, navigate));
    setConfirmationModal(null);
  };

  const handleDeleteAccount = () => {
    try {
      setConfirmationModal({
        text1: 'Delete Account',
        text2: "Are you sure you want to delete...?",
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => deleteProfileAccount(token),
        btn2Handler: () => setConfirmationModal(null),
      });
    } catch (error) {
      console.log("Error Message - ", error.message);
    }
  };

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-red-900 p-8 w-full flex-wrap justify-center">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FaTrashAlt className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2 items-center">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-4/5 text-pink-25 text-center">
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
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default DeleteAccount;
