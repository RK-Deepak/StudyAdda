import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createRating } from '../../../services/operations/courseAPI';
import ReactStars from 'react-stars'

import IconBtn from '../common/IconBtn';


const CourseReviewModal = ({setReviewModal}) => {

  const {user}=useSelector((store)=>store.profile);
  const {token}=useSelector((store)=>store.auth);
  const {courseEntireData}=useSelector((store)=>store.viewCourse);

  const {
    handleSubmit,
    setValue,
    formState:{errors},
    register,
    
  }=useForm();

  useEffect(()=>
{
        setValue("courseExperience","");
        setValue("courseRating",0)
},[])

const ratingChanged=(newRating)=>
{
  setValue("courseRating",newRating)
}

const onsubmit=async (data)=>
{
  await createRating({courseId:courseEntireData._id,
  rating:data.courseRating,
  review:data.courseExperience,
  },
 token)
 setReviewModal(false);
}

  return (
    <div>
      <div>
        <div>
        <p>Add Review</p>
                <button 
                onClick={setReviewModal(false)}
                >
                    Close
                </button>
        </div>
        {/* modal body */}
        <div>
          <div>
            <img src={user?.profileImage} alt='user image'  className='aspect-square  w-[50px] rounded-full object-cover'/>

            <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
          </div>
          <form onSubmit={handleSubmit(onsubmit)} 
              className='mt-6 flex flex-col items-center'
          >
            <ReactStars count={5}
            onChange={ratingChanged} 
            size={24}
            color2="#ffd700"/>

            <div>
            <label htmlFor='courseExperience'>
                            Add Your Experience*
                        </label>

                        <textarea 
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='form-style min-h-[130px] w-full'
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
            </div>
            <div>
              <button onClick={()=>setReviewModal(false)}>
                   Cancel
              </button>
              <IconBtn text="save"/>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal