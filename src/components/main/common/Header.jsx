import React, { useEffect, useState,useRef } from 'react'
import Logo from "../../../assets/Logo/studyadda-high-resolution-logo-transparent.png"
import { NavbarLinks } from '../../../data/navbar-links'
import { Link, matchPath } from 'react-router-dom'
import {  FaCartPlus, FaSearch } from 'react-icons/fa'
import { FaSortAlphaDown } from "react-icons/fa";
import { MdAccountCircle, MdArrowDropDown } from 'react-icons/md'

import {GiDiamondsSmile} from "react-icons/gi"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'
import ProfileDropDown from '../Auth/ProfileDropDown'
import smalllogo from "../../../assets/Logo/studyadda-favicon-color.png"
import useOnClickOutside from '../../../hooks/useClickOutside'


const Header = () => {
    
  const location=useLocation();
  const refmenu=useRef(null);
  const refauth=useRef(null);
  
  const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
  const token=localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null;
  const totalItems=useSelector((store)=>store.cart.totalItems);

  const [subLinks,setsublinks]=useState(null);
  const [showmenu,setshowMenu]=useState(false);
  const [auth,setAuth]=useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
//   const subLinks=[
//     {
//        title:"Web Dev",
//        path:"/webdev"
//     },
    
//         {
//             title:"Python",
//             path:"/python"
//          },
    
//   ]

const fetchCatlog=async ()=>
{
    try 
    {
        const result=await apiConnector("GET",categories.CATEGORIES_API);;
        console.log(result?.data?.data);
        setsublinks(result?.data.data)
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

   

  return (
    <div className='w-11/12 h-14 border mx-auto flex items-center justify-between relative z-49'>
        {/* left one */}
        <div>
            <Link to={"/"} className='hidden md:block'>
            <img src={Logo} alt='logo' className='w-[100px] ' />
            </Link>
            <Link to={"/"} className='block md:hidden'>
            <img src={smalllogo} alt='logo' className="w-[60px]"/>
            </Link>
            
        </div>
        {/* middle one */}
        <div className='block md:hidden text-white text-2xl' ><FaSortAlphaDown onClick={()=>{
            
            setshowMenu(true);

        }}/></div>
        <div className={`flex gap-6 md:gap-3 items-center  flex-col absolute top-12 left-[30%] sm:left-[40%]   min-w-[150px]  p-[20px] md:p-0 rounded-xl  md:rounded-none md:w-auto bg-richblack-800 border border-richblack-25 md:border-none z-50 md:z-1  md:relative md:bg-transparent md:left-0 md:top-0  md:flex-row  ${showmenu?"flex":"hidden"} md:flex  `} ref={refmenu}>
            
        {
    NavbarLinks.map((option, index) => (
        <Link to={option?.path} key={index}>
            {option.title === "Catalog" ? (
                <div className={`flex items-center gap-1 relative $ group text-[13px] md:text-[16px] z-49`}>
                    <span className={matchRoute("/catlog/:catlogName") ? "text-yellow-50" : "text-white"}>{option.title}</span>
                    <MdArrowDropDown className='text-[20px] text-white' />
                    <div className='absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 '>
                        <div className='w-[20px] aspect-square bg-white -right-[83px] top-4 absolute rotate-45 z-50'></div>
                        <div className='p-4 bg-richblack-50 -left-[33px] top-[22px] absolute flex flex-col  w-[200px] text-black gap-2 rounded-md z-50 '>
                            {
                                subLinks?.map((sublink,index)=>
                                {
                                   return <Link to={`catlog/${sublink?.name}`}  key={index} onClick={()=>setshowMenu(false)} className='font-inter font-bold ' >{sublink.name}</Link>
                                })
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <p className={`font-inter text-[13px] md:text-[16px] ${matchRoute(option?.path) ? "text-yellow-50" : "text-white"}`} onClick={()=>setshowMenu(false)}>{option?.title}</p>
            )}
        </Link>
    ))
}


        </div>
        {/* right one-LOGIN,SIGNUP */}
        <div className='block md:hidden text-white text-2xl'><GiDiamondsSmile onClick={()=>
            {
                
            setAuth(prev=>!prev)

        }} /></div>
        <div className={`flex gap-3 items-center flex-col absolute top-[51px] right-[19px] md:relative md:top-0 md:right-0 md:flex-row z-49  ${auth?"flex":"hidden"} md:flex` } ref={refauth}>
           {
             token===null && (
                <Link to={"/login"} onClick={()=>setAuth(false)}>
                      <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                </Link>
             )
           }
            {
             token===null && (
                <Link to={"/signup"} onClick={()=>setAuth(false)}>
                      <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                </Link>
             )
           }
           {
            user && user.accountType!=="Instrcutor" && (
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
           {
            user && <ProfileDropDown/>
           }
          
        </div>
    </div>
  )
}

export default Header
