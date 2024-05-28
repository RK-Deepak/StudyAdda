import React, { useRef,useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/authAPI';
import useOnClickOutside from '../../../hooks/useClickOutside';


const ProfileDropDown = ({setAuth}) => {
  const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
    const [open,setOpen]=useState(false);
    const ref=useRef(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
   
  //in start ref.current is null
   useOnClickOutside(ref,()=>setOpen(false))
   console.log(ref)
   

  return (
    <div className="relative" onClick={() => setOpen(true)}>
       <div className="flex items-center gap-x-1">
         <img src={user.profileImage} alt={`profile-${user.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover object-top"
          />
       </div>
       {open && 
       (
        //add e.stopprogoation if u need
         <div ref={ref}
         className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px]
           border-richblack-700 bg-richblack-800"
         >
            {/* //DASHBARD */}
        <Link to="/dashboard/my-profile" onClick={()=>setOpen(false)}>
        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700
             hover:text-richblack-25">
              <VscDashboard className="text-lg text-white"  />
              Dashboard
        </div> 
        
        </Link>
         {/* //MdLogout */}
         <div
          onClick={() => {
           
            setOpen(false)
            
            setAuth(false);
            
            dispatch(logout(navigate));
          }}
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
           hover:bg-richblack-700 hover:text-richblack-25"
        >
          <VscSignOut className="text-lg text-white" />
          Logout
         </div>

         </div>
       )}
    </div>
  )
}

export default ProfileDropDown