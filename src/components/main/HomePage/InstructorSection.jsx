import React from 'react'

import CodeBlocks from './CodeBlocks'
import HighlightText from './HighlightText'
import InstructorX from "../../../assets/Images/Instructor.png"
import love from "../../../assets/Images/love.jpg"
import striver from "../../../assets/Images/striver.jpg"

const InstructorSection = () => {
  return (
    <div className='flex w-full mx-auto  lg:ml-[90px] gap-28 lg:gap-20 flex-wrap md:flex-row lg:justify-between justify-center p-8' >
            {/* section-3-left */}
            <div className='relative md:ml-[45px] md:mx-auto mr-[63px] mb-[144px] ' style={{ width: '270px', height: '270px', borderRadius: '50%', }}>
    <img src={InstructorX} alt='instructor' className='absolute w-[90%] sm:w-[80%] aspect-square rounded-full shadow shadow-green-500' style={{ transformOrigin: 'center', top: '63%', left: '-5%', transform: 'rotate(0deg)'  ,animation: 'spin 10s linear infinite' }} title='Hitesh Choudhary'/>
    <img src={striver} alt='instructor' className='absolute w-[90%] sm:w-[80%] aspect-square rounded-full shadow shadow-green-500' style={{ transformOrigin: 'center', top: '43%', left: '52%', transform: ' rotate(240deg)',animation: 'spin 8s linear infinite'  }} title='Striver' />
    <img src={love} alt='instructor' className='absolute w-[90%] sm:w-[80%] aspect-square rounded-full shadow shadow-green-500' style={{ transformOrigin: 'center', top: '97%', left: '49%', transform: ' rotate(120deg)' ,animation: 'spin 7s linear infinite' }} title='Love Babbar'/>

</div>




           {/* /section-3-right */}
           <div className='max-w-[500px]  w-full mx-auto shadow shadow-green-600 rounded-md p-5 '>
                <CodeBlocks position={"flex-col  items-center w-[100%] mt-0 sm:mt-20"} heading={
                    <div className='text-xl lg:text-4xl font-semibold flex items-center gap-2 text-white '>
                    Be A
                     <HighlightText text={"Guru"} textanimationshow={false}/>
                    </div>

                }
                subheading={
                    "Instructors from around the world teach millions of students on StudyAdda. We provide the tools and skills to teach what you love."
                }
                codebtn1={
                    {
                        btnText:"Start Teaching Today",
                        linkto:"/signup",
                        active:true
                    }
                }
               
             
                >
           </CodeBlocks>

                
                
            </div>
         </div>
  )
}

export default InstructorSection