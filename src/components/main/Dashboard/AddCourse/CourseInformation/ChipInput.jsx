import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

const ChipInput = ({label,name,placeholder,register,errors,setValue,getValues}) => {

    const {course,editcourse}=useSelector((store)=>store.course);

    //tags we call them chips

    const [chips,setChips]=useState([]);


    useEffect(()=>
    {
        if(editcourse)
        {
            setChips(course?.tag)
        }

        //another way of handling form input 
        //registering tag input with validation
        register(name,{required:true,validate:(value)=>value.length>0})

    },[])

    //if chips/tags changes than rendering of page and chipset
    useEffect(()=>
    {
      setValue(name,chips)

    },[chips])

    const handleKeyDown=(event)=>
    {
        //when we click we check click button is enter or comma
        if(event.key==="Enter" || event.key===",")
        {
          event.preventDefault();

          const chipValue=event.target.value.trim();
          //if chipvalue hai or chips aarray me chipvalue nhi hai
          if(chipValue && !chips.includes(chipValue))
          { 
           const newChips=[...chips,chipValue];
           setChips(newChips);
           event.target.value=""
          }
        }
    }

    //deleteing tag by clicking cross
    const handleDeleteChip=(chipIndex)=>
    {
        const newChips=chips.filter((item,index)=>chipIndex!==index);
        setChips(newChips)
    }
   
  return (
    <div className="flex flex-col space-y-2">
        {/* Render the label for input */}
      <label className="text-sm text-richblack-5"  htmlFor={name}>
        {label}<sup className="text-pink-200">*</sup>
      </label>
      {/* Render the chips or tags and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* mapp over chips */}
      

        {/* Render Input Field */}
        <input type="text" name={name} 
         placeholder={placeholder} id={name} 
         onKeyDown={handleKeyDown} 
         className="form-style w-full"
         />
         {/* mapp over chips */}
        {
            chips?.map((chip,index)=>
            {
                return <div  key={index}
                className="m-1 flex items-center rounded-full bg-green-400 px-2 py-1 text-sm text-richblack-800">
                     {/* Render the chip value */}
            {chip}
            {/* Render the button to delete the chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
                </div>
            })
        }
      </div>
      {errors[name] && (
         <span className="ml-2 text-xs tracking-wide text-pink-200">
         {label} is required
       </span>
      )

      }
    </div>
  )
}

export default ChipInput