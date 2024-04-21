import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete, MdEdit } from 'react-icons/md';
import { BiDownArrow } from 'react-icons/bi';
import ConfirmationModal from '../../common/ConfirmationModal2';
import { deleteSection, deleteSubSectionData } from '../../../../services/operations/courseAPI';
import { setCourse } from '../../../../store/Slices/courseSlice';

import SubSectionModal from './SubSectionModal';
import { MdOutlineAddReaction } from "react-icons/md";

const NestedCourseView = ({handleChangeEditSectionName}) => {
    const {course}=useSelector((store)=>store.course);
    const dispatch=useDispatch();
    const {token}=useSelector((store)=>store.auth);

    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);

    const [confirmationModal,setShowConfirmationModal]=useState(null);

    const handelDeleteSection=async(sectionId)=>
    {
        console.log(sectionId)
        const response=await deleteSection({sectionId,courseId:course._id},token);
        console.log(response)
        if(response)
        {
            dispatch(setCourse(response));
        }
        setShowConfirmationModal(null)
    }
    const handelDeleteSubSection=async(subSectionId,sectionId)=>
    {
          const response=await deleteSubSectionData({subSectionId,sectionId,courseId:course._id},token);
          if(response)
          {
            dispatch(setCourse(response));
          }
          setShowConfirmationModal(null)
     
    }
    

  return (
    <div>
        <div      className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer" >
           {
            course?.courseContent.map((section)=>
            {
                //i choose details because of dropdown effect
                return <details key={section._id} open>
                    <summary className="flex flex-col  sm:flex-row cursor-pointer items-center gap-3 sm:justify-between border-b-2 border-b-richblack-600 py-2">
                      <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu className="text-2xl text-richblack-50"/>
                        <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                      </div>
                      <div className=' flex items-center gap-x-3'>
                        <button onClick={()=>
                            {
                                console.log("i m ckick1")
                                handleChangeEditSectionName(section._id,section.sectionName);
                                console.log("i m ckick1")
                            }
                            }>
                            <MdEdit className="text-xl text-richblack-300"/>
                        </button>
                        <button
                        onClick={()=>setShowConfirmationModal({
                             text1:"Delete this Section",
                             text2:"All the lectures in this section wil be deleted",
                             btn1Text:"Delete",
                             btn2Text:"Cancel",
                             btn1Handler:()=>handelDeleteSection(section._id),
                             btn2Handler:()=>setShowConfirmationModal(null)
                        })} 
                        >
                            <MdDelete className="text-xl text-richblack-300"/>
                        </button>
                        <span className="font-medium text-richblack-300">|</span>
                        <BiDownArrow className={`text-xl text-richblack-300`}/>

                      </div>
                    </summary>
                    
                    {/* //for subsections */}
                    <div className="px-6 pb-4">
                      {section?.subSection?.map((item)=>(
                        <div key={item._id} onClick={()=>setViewSubSection(item)}
                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">
                          <div className='flex items-center gap-x-3 py-2'>
                                    <RxDropdownMenu className="text-2xl text-richblack-50"  />
                                    <p className="font-semibold text-richblack-50">{item.title}</p>
                                </div>
                                <div className='flex items-center gap-x-3'
                                onClick={(e)=>e.stopPropagation()}
                                >
                                  <button onClick={()=>setEditSubSection({...item,sectionId:section._id})}>
                                    <MdEdit className="text-xl text-richblack-300"/>
                                  </button>
                                  <button
                                   onClick={()=>
                                   {
                                    setShowConfirmationModal({
                                      text1: "Delete this Sub Section",
                                      text2: "selected Lecture will be deleted",
                                      btn1Text: "Delete",
                                      btn2Text: "Cancel",
                                      btn1Handler:()=>handelDeleteSubSection(item._id,section._id),
                                      btn2Handler:()=>setShowConfirmationModal(null)

                                    })
                                   }}>
                                    <MdDelete className="text-xl text-richblack-300"/>
                                  </button>
                                </div>
                        </div>
                      ))}
                      <button
                      className='mt-4 flex items-center gap-x-2 text-yellow-50'
                      onClick={()=>setAddSubSection(section._id)} >
                        <MdOutlineAddReaction size={20} className="text-yellow-50"/>
                        <p>Add Lecture</p>
                      </button>

                    </div>

                  
                 
                </details>
            })
           }
        </div>
        {addSubSection ?
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
        :viewSubSection ?
        <SubSectionModal
         modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}/>:
        editSubSection?
        <SubSectionModal 
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}/>:
        <div></div>

        }
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}

export default NestedCourseView