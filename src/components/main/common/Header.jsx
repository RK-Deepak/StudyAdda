import React, { useEffect, useState,useRef } from 'react'
import Logo from "../../../assets/Logo/studyadda-high-resolution-logo-transparent.png"
import { NavbarLinks } from '../../../data/navbar-links'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import {  FaCartPlus} from 'react-icons/fa'
import { FaSortAlphaDown } from "react-icons/fa";
import {  MdArrowDropDown, MdBook } from 'react-icons/md'

import {GiDiamondsSmile} from "react-icons/gi"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'
import ProfileDropDown from '../Auth/ProfileDropDown'
import smalllogo from "../../../assets/Logo/studyadda-favicon-color.png"
import useOnClickOutside from '../../../hooks/useClickOutside'
import { setSideBar } from '../../../store/Slices/sideBarSlice'
import { FcVideoCall } from "react-icons/fc"



const Header = () => {
    
  const location=useLocation();
  const dispatch=useDispatch();
  const refmenu=useRef(null);
  const refauth=useRef(null);
  const navigate=useNavigate();

  
  const {user}=useSelector((store)=>store.profile)
  const token=localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null;
  const totalItems=useSelector((store)=>store.cart.totalItems);

  const [subLinks,setsublinks]=useState(null);
  const [showmenu,setshowMenu]=useState(false);
  const [auth,setAuth]=useState(false);
  const [loading,setloading]=useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }


const fetchCatlog=async ()=>
{
    try 
    {
        setloading(true);
        const result=await apiConnector("GET",categories.CATEGORIES_API);;
        console.log(result?.data?.data);
        setsublinks(result?.data.data)
        setloading(false);
    }
    catch(error)
    {
        console.log("Could not fetch the category list")
    }
    
    
}
useOnClickOutside(refauth,()=>setAuth(false));
useOnClickOutside(refmenu,()=>setshowMenu(false))

 useEffect(()=>
 {
      fetchCatlog();
    
 },[])

 const handleSideMenu=()=>
 {
   
dispatch(setSideBar());

 }

   

  return (
    <div className='w-11/12 h-14  mx-auto flex items-center justify-between relative z-49'>
        {/* left one */}
        <div>
            <Link to={"/"} className='hidden md:block'>
            <img src={Logo} alt='logo' className='w-[100px] ' />
            </Link>
            <div className='flex items-center flex-row-reverse'>
            <Link to={"/"} className=' md:hidden flex flex-row-reverse items-center '>
            <img src={smalllogo} alt='logo' className="w-[45px]"/>
           
            </Link>
           {matchRoute("/dashboard/:variable") && <MdBook className='text-white block md:hidden text-3xl' onClick={handleSideMenu }/>}
            </div>
            
        </div>
        {/* middle one */}
        <div className='block md:hidden text-white text-2xl' ><FaSortAlphaDown onClick={()=>{
            
            setshowMenu(prev=>!prev);

        }}/></div>
        <div className={` gap-6 md:gap-3 items-center  flex-col absolute top-12 left-[30%] sm:left-[40%]   min-w-[150px]  p-[20px] md:p-0 rounded-xl  md:rounded-none md:w-auto bg-richblack-800 border border-richblack-25 md:border-none z-50 md:z-1  md:relative md:bg-transparent md:left-0 md:top-0  md:flex-row  ${showmenu?"flex":"hidden"} md:flex  `} ref={refmenu}>
          {/* please check if catalog button is clickable in phone or not   */}
        {
NavbarLinks.map((option, index) => (
    <div key={index}>
        {option.title === "Catalog" ? (
            <div className={`flex items-center gap-1 relative $ group text-[13px] md:text-[16px] z-49 `}>
                <span className={matchRoute("/catlog/:catlogName") ? "text-yellow-50" : "text-white"} onClick={()=>dispatch(setSideBar())}>{option.title}</span>
                <MdArrowDropDown className='text-[20px] text-white' />
                 <div className='absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 '>
                    <div className='w-[20px] aspect-square bg-white -right-[83px] top-4 absolute rotate-45 z-50'></div>
                    {!loading ?<div className='p-4 bg-richblack-50 -left-[33px] top-[22px] absolute flex flex-col  w-[200px] text-black gap-2 rounded-md z-50 '>
                        {
                            subLinks?.map((sublink,index)=>
                            {
                               return <Link to={`catlog/${sublink?.name}`}  key={index} onClick={()=>setshowMenu(false)} className='font-inter font-bold ' >{sublink.name}</Link>
                            })
                        }
                    </div>:<p className='p-4 bg-richblack-50 -left-[33px] top-[22px] absolute w-[200px] text-black font-inter font-bold gap-2 rounded-md z-50 text-effect'>
  Fetching Catalog
</p>}
                    
                </div>
                
                
            </div>
        ) : (
            <Link to={option?.path} onClick={()=>setshowMenu(false)} className='flex flex-col items-center gap-2'>
           {option.title==="Peer Call" && user?.accountType==="Student" && <FcVideoCall className='text-2xl' onClick={()=>navigate("/peerToPeer/videoCall")}/>}
           {option.title!=="Peer Call" &&  <p className={`font-inter text-[13px] md:text-[16px] ${matchRoute(option?.path) ? "text-yellow-50" : "text-white"}`}>{option?.title}</p>}
            </Link>
        )}
    </div>
))

}    


        </div>
        {/* right one-LOGIN,SIGNUP */}
        <div className='block md:hidden text-white text-2xl'><GiDiamondsSmile onClick={()=>
            {
                
            setAuth(prev=>!prev);

        }} /></div>
     
        <div className={`flex gap-3 items-center flex-col absolute top-[51px] right-[19px] md:relative md:top-0 md:right-0 md:flex-row  z-[20]  ${auth?"flex":"hidden"} md:flex md:bg-transparent bg-richblack-800 p-7 rounded-md md:border-none md:p-0 border border-richblack-50 ` } ref={refauth} >
    
           
           {
             token===null && (
                <Link to={"/login"}  onClick={() => {
                    setAuth(false);
                    setshowMenu(false);
                }}>
                      <button className='border border-richblack-700 bg-richblack-900 px-[12px] py-[4px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                </Link>
             )
           }
            {
             token===null && (
                <Link to={"/signup"} onClick={() => {
                    setAuth(false);
                    setshowMenu(false);
                }}>
                    <button className='border border-richblack-700 bg-richblack-900 px-[12px] py-[4px] text-richblack-100 rounded-md'>
                        Sign Up
                    </button>
                </Link>
             )
           }
           {
            user && user.accountType!=="Instructor" && (
                <Link to={"/dashboard/wishlist"} className='realtive text-white'>
                    <FaCartPlus/>
                    {
                        totalItems>0 && 
                        <span className="absolute top-0 -left-[20px] p-1 rounded-full bg-yellow-25 font-sm text-black w-[20px] aspect-square text-center leading-snug font-bold">
                            {
                                totalItems
                              
 
                            }
                        </span>
                    }
                </Link>
            )
           }
              {token && user?.accountType==="Student"  && <div className='flex  font-inter justify-center my-3'>
                    
                    <div className='flex gap-2 items-center text-yellow-25 font-semibold'>💰{""}{Math.round(user?.coupanPoints)}</div>
                </div>}
           {
            user && <ProfileDropDown setAuth={setAuth}/>
           }

          
        </div>
    </div>
  )
}

export default Header
