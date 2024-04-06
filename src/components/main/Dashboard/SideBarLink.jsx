import React, { useEffect, useState } from 'react';
import * as Icons from "react-icons/vsc";
import * as Icons1 from "react-icons/md";
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SideBarLink = ({ linkdata,setShowConfirmationModel }) => {
   const location = useLocation();
   const { icon, name, path, type } = linkdata;
   const Icon = Icons[icon] || Icons1[icon];
   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
   const accountType = user ? user.accountType : null;
   const dispatch=useDispatch();

 
   const matchRoute = (route) => {
      return location.pathname === route;
   };

   const isUserAuthorized = () => {
      if (!accountType || undefined) return false;
      return type.includes(accountType) || accountType ==="Admin";
   };
   if(linkdata.id===9)
   {
    return (
    
      isUserAuthorized() &&
      <div
         
         className={`relative px-8 py-2 text-sm font-semibold cursor-pointer ${matchRoute(path) ? "bg-richblack-800 text-white" : "bg-opacity-0 text-yellow-25"
            } `} onClick={()=>setShowConfirmationModel(true)}
      >
         <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-red-700 ${matchRoute(path) ? "opacity-100" : "opactity-0"}`} />
         <div className='flex item-center gap-x-2'>
            <Icon className="text-lg" />
            <span>{name}</span>
         </div>
        
     </div >
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
