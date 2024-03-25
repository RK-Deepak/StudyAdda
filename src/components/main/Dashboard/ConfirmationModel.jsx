import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const ConfirmationModel = ({ setShowConfirmationModel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        setShowConfirmationModel(false);
        dispatch(logout(navigate));
    };

    return (
        <div className='min-h-screen w-full fixed top-0 left-0 flex items-center justify-center z-50'>
            {/* Background Overlay with Blur Effect */}
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-80 z-40'></div>

            {/* Confirmation Dialog */}
            <div className=' bg-richblack-800 p-6 rounded-lg shadow-lg z-50 border-4 border-richblack-100 animate-scaleIn w-[300px]'>
                <p className='text-xl font-semibold text-white mb-4 text-center'>Are you sure?</p>
                <div className='flex justify-center'>
                    <button className='px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600' onClick={handleLogout}>
                        <AiOutlineCheckCircle className='inline-block mr-1' />
                        Yes
                    </button>
                    <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600' onClick={() => setShowConfirmationModel(false)}>
                        <AiOutlineCloseCircle className='inline-block mr-1' />
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModel;
