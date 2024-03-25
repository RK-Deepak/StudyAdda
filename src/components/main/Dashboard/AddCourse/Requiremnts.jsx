import React, { useState,useEffect } from 'react'
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux'

const Requiremnts = ({name,label,placeholder,register,setValue,getValues,errors}) => {

    const {course,editcourse}=useSelector((store)=>store.course);

    const [requirements,setRequirements]=useState("");
    const [requirementList,setRequirementList]=useState([]);

    //intially if course is edited  or not and register for name
    useEffect(()=>
    {
        if(editcourse)
        {
            setRequirementList(course?.instructions)
        }

        register(name,{required:true,validate:(value)=>value.length>0})
    },[])

    //if any change happen in requiremtlist it re-render 
    useEffect(()=>
    {
      setValue(name,requirementList)
    },[requirementList])

    //handling addition of instructions

    const handleAddRequirement=(e)=>
    {
        if(requirements)
        {
            const newRequirementList=[...requirementList,requirements];
            setRequirements("")
            setRequirementList(newRequirementList)
            
        }
    }

     //handle addition
    const handleRemoveRequirement=(deleteindex)=>
    {
        const updateRequirements=[...requirementList]
       const newRequiremtList=updateRequirements.filter((item,index)=>index!==deleteindex)
       setRequirementList(newRequiremtList)
    }


  return (
    <div className="flex flex-col space-y-2">
        {/* label add */}
       <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
    
        {/* input instruction */}
        <input type='text'
        id={name}
        placeholder={placeholder}
        value={requirements}
        onChange={(e)=>setRequirements(e.target.value)}
        className="form-style w-full"
        />
        {/* //add  button */}
         <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-sm px-2 py-1 border border-richblack-100 rounded-md bg-green-900 text-white"
        >
          + Add
        </button>
        {
            requirementList.length>0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementList.map((requirement,index)=>
                    {
                       return <li key={index} className="flex items-center text-richblack-5">
                            <span>{requirement}</span>

                            <button
                type="button"
                className="ml-2 text-sm text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                <MdCancel/>
              </button>
                        </li>

                        
                    })}
                </ul>
            )
        }
        {errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200 ">
                {label} is required
            </span>
        )}
      </div>
    </div>
  )
}

export default Requiremnts