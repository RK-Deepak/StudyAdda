import React, { useEffect, useState } from 'react';
import * as Icons from "react-icons/vsc";
import * as Icons1 from "react-icons/md";
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ConfirmationModal from '../common/ConfirmationModal2';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';

const SideBarLink = ({ linkdata}) => {
   const location = useLocation();
 
   const navigate = useNavigate();
   const { icon, name, path, type } = linkdata;
   const Icon = Icons[icon] || Icons1[icon];
   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
   const accountType = user ? user.accountType : null;
   const dispatch=useDispatch();
   const [confirmationModal,setconfirmationModal] = useState(null);
  console.log("im linked",linkdata)
 
   const matchRoute = (route) => {
      return location.pathname === route;
   };

   const isUserAuthorized = () => {
      if (!accountType || undefined) return false;
      return type.includes(accountType) || accountType ==="Admin";
   };

   const handlelogout=()=>
   {
      setconfirmationModal(null);
        dispatch(logout(navigate));
   }
   if (linkdata.id === 9) {
      return (
        <>
          {isUserAuthorized() && (
            <div
              className={`relative px-8 py-2 text-sm font-semibold cursor-pointer ${matchRoute(path) ? "bg-richblack-800 text-white" : "bg-opacity-0 text-yellow-25"
                } `}
              onClick={() => setconfirmationModal({
                text1: "Log Out",
                text2: "Are you sure you want to log out?",
                btn1Handler: handlelogout, // Removed curly braces around handlelogout
                btn2Handler: () => setconfirmationModal(null),
                btn1Text: "Yes",
                btn2Text: "No"
              })}
            >
              <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-red-700 ${matchRoute(path) ? "opacity-100" : "opacity-0"}`} />
              <div className='flex item-center gap-x-2'>
                <Icon className="text-lg" />
                <span>{name}</span>
              </div>
            </div>
          )}
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
      );
    }
    

   

   return (
    
      isUserAuthorized() &&
      <>
      <NavLink
         to={path}
         className={`relative px-8 py-2 text-sm font-semibold ${matchRoute(path) ? "bg-richblack-800 text-white" : "bg-opacity-0 text-yellow-25"
            } `}
      >
         <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-red-700 ${matchRoute(path) ? "opacity-100" : "opactity-0"}`} />
         <div className='flex item-center gap-x-2'>
            <Icon className="text-lg" />
            <span>{name}</span>
         </div>
   
      </NavLink>
            {linkdata.id === 7 && <div className='h-[1px] bg-white mt-4 w-[90%] mx-auto'></div>}


            </>
   );
};

export default SideBarLink;
