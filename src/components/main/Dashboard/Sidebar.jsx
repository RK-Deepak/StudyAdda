import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SideBarLink from './SideBarLink'



const Sidebar = ({setShowConfirmationModel}) => {

    console.log(sidebarLinks);
     return (
    
     <div className="flex flex-col gap-2 w-[100%] max-w-[200px] border bg-[#2C333F] min-h-screen py-4">
        {
           sidebarLinks.map((linkdata,index)=>
           {
            
            if(linkdata.id===9)
            {
              return <SideBarLink linkdata={linkdata} key={linkdata.id} setShowConfirmationModel={setShowConfirmationModel}/>
            }
            else 
            {
              return <SideBarLink linkdata={linkdata} key={linkdata.id} />
            }
            

            
           
            
           })
        }    
    </div>
  )
}

export default Sidebar