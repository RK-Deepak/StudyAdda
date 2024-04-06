import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const RenderSteps = () => {
    const {step}=useSelector((store)=>store.course);

  const steps=[
    {
      id:1,
      title: "Course Information",
  },
  {
      id:2,
      title: "Course Builder",
  },
  {
      id:3,
      title: "Publish Ur Course",
  },
  ]
  return (
    <div >
    <div className='flex w-[80%] mx-auto justify-between items-center gap-2 '>
        {steps.map((item,index)=>
        {
          return  <>
            <div className={`${item.id===step?"bg-yellow-900 border-yellow-50 text-yellow-50 ":"border-richblack-700 bg-richblack-800 text-richblack-300"} h-[60px] aspect-square rounded-full flex justify-center items-center font-inter font-bold text-xl ${step>item.id?"bg-yellow-700":""}`} key={item.id} >
                 {step>item.id ?<FaCheck />:item.id}
                 
            </div>
            <div className={`${index !== 2 ? `border border-dotted ${step>item.id ?"border-yellow-50":"border-richblack-50"} h-[1px] w-[90%]`:"border-none h-0 w-0"} `}></div>

            </>
        })}
        </div>
        
        
        {steps.map((item,index)=>
        {
          return  <>
            <div className="text-white w-full flex justify-center my-7 text-lg underline underline-offset-2" key={item.id}>
                 {step===item.id && <p>{item.title}</p>}
                 
            </div>
          

            </>
        })}
        
        
        
    
       

   
</div>
  )
}

export default RenderSteps