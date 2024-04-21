import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';
import IconBtn from '../../common/IconBtn';
import {FiUpload} from "react-icons/fi"


const ChangeProfileImage = () => {
  const {user}=useSelector((store)=>store.profile);
  const {token}=useSelector((store)=>store.auth);

  const fileInputRef=useRef(null);
  const dispatch=useDispatch();

  const [loading,setLoading]=useState(false);
  const [imageFile,setImageFile]=useState(null);
  const [previewSource,setPreviewSource]=useState(null)

  // defines a function handleClick that, when called, triggers a click event on a file input element. This is commonly used in scenarios where you want to trigger file selection dialog programmatically when a user interacts with other elements on the page

//   handleClick: This function is triggered when a user clicks on a specific element, such as a button or an icon. In this case, it's used to programmatically trigger a click event on the file input element (fileInputRef.current.click()). This simulates the user clicking on the file input element, which opens the file selection dialog.


// handleFileChange: This function is triggered when the user selects a file using the file input element and confirms the selection in the file selection dialog. It extracts the selected file from the event object and updates the state with the selected file. Additionally, it may perform further actions related to the selected file, such as generating a preview.
  const handleClick=()=>
  {
    fileInputRef.current.click()
  }
  
  const handleFileChange=(e)=>
  {
     const file=e.target.files[0];
 
     if(file)
     {
      setImageFile(file);
      previewFile(file)
     }
  }

  const previewFile=(file)=>
  {
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>
    {
      setPreviewSource(reader.result)
    }
  }
  const handleFileUpload=()=>
  {
    console.log("yaha tak paunch gaya")
    try 
    {
       console.log("Uploading....");
       setLoading(true);
       const formData=new FormData();
       console.log("hi imageFile",imageFile)
       formData.append("displayPicture",imageFile);
       console.log(formData?.displayPicture)
       dispatch(updateDisplayPicture(formData,token)).then(()=>
       {
        setLoading(false)
       })
    }
    catch(error)
    {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(()=>
  {
    if(imageFile)
    {
      previewFile(imageFile)
    }
  },[imageFile])

  
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4 flex-wrap">
          <img
            src={previewSource || user?.profileImage}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] sm:w-[78px] rounded-full object-cover object-top"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3  flex-wrap">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default ChangeProfileImage