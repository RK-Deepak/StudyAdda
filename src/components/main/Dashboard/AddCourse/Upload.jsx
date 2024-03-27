import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux'
import { Player } from 'video-react';
import { FaFileUpload } from 'react-icons/fa';
import "video-react/dist/video-react.css"

const Upload = ({name,label,register,setValue,errors,getValues,video=false,viewData=null,editData=null}) => {

    //getting course details from redux store
    const {course}=useSelector((store)=>store.course);

    //this is for file which we select by drop or select
    const [selectedFile,setSelectedFile]=useState(null);
    //which generate a preview of image
    const [previewSource,setPreviewSource]=useState(
        viewData?viewData:editData?editData:""
    )
    

   const inputRef=useRef();
 
   //when we browser and set
   const handleClick=()=>
   {
    inputRef.current.click();
   }

   const handleSelectFile=(e)=>
   {
    console.log(e)
    e.preventDefault();
    const file=e.target.files[0];
    setSelectedFile(file)
    previewFile(file)
    
      
   }
   //when we drop and set
   const onDrop=(acceptedFiles)=>
   {
    const firstFile=acceptedFiles[0];
    console.log(acceptedFiles)
    if(firstFile)
    {
        previewFile(firstFile);
        setSelectedFile(firstFile)
    }
   }
    //we usedropzone library
    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        accept:!video ? {"image/*":[".jpg",".jpeg",".png"]} :
                 {"video/*":[".mp4"]},
        onDrop
    })

    //this is common for both drop or seclect via browse

    function previewFile(file)
    {
       const reader=new FileReader();
       reader.readAsDataURL(file);
       reader.onload=()=>
       {
          setPreviewSource(reader.result)
       }
    }

    useEffect(()=>
    {
        if(editData)
        {
            setPreviewSource(course?.thumbnail);
        }
        register(name,{required:true})
    },[])

    useEffect(()=>
    {
        setValue(name,selectedFile)
    },[selectedFile])
  return (
    <div className="flex flex-col space-y-2">
 <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}<sup className="text-pink-200">*</sup>
      </label>
      {/* if we are dragging i m setting the bg color */}
      <div className={`${isDragActive?"bg-richblack-600":"bg-richblack-700" } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
        {/* if previewsource is available or not */}
        { previewSource?
        (<div className="flex w-full flex-col p-6">
           {!video ?
           <img src={previewSource} alt="Preview" className="h-full max-h-[300px] aspect-square rounded-md object-fill" />
           :
           <Player playsInline src={previewSource} aspectRatio='16:9'/>
           }
           {/* i need a cancel button when we upload data */}
           {!viewData && 
           <button type='button'
           onClick={()=>
        {
            setPreviewSource("");
            setSelectedFile(null);
            setValue(name,null)
        }}
        className="mt-3 text-richblack-400 underline" >
Cancel
           </button>

           }
         </div>)
        :
        (<div className="flex w-full flex-col items-center p-6"
        {...getRootProps()}>
            <input type='file' {...getInputProps()} ref={inputRef} onChange={handleSelectFile}/>
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FaFileUpload className="text-2xl text-green-900" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50" onClick={handleClick}>Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>

        </div>)

        }

      </div>
      {
        errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }
    </div>
  )
}

export default Upload