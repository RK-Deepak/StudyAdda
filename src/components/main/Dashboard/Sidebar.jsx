import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SideBarLink from './SideBarLink'
import { useSelector } from 'react-redux'



const Sidebar = () => {
  const {viewsideBar} = useSelector((store)=>store.SideBar);
  console.log(viewsideBar)

    console.log(sidebarLinks);
     return (
    
     <div className={`flex-col gap-2 w-[100%] max-w-[200px] border bg-[#2C333F]  py-4   ${viewsideBar?"flex absolute sm:relative":"hidden  relative"} md:flex`}  >
        {
           sidebarLinks.map((linkdata,index)=>
           {
            
         
            
              return <SideBarLink linkdata={linkdata} key={linkdata.id} />
            
     
            
            

            
           
            
           })
        }    
    </div>
  )
}

export default Sidebar