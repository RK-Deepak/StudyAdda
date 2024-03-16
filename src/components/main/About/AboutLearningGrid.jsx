import React from 'react'
import { LearningGridArray } from '../../../utils/contants'
import HighlightText from '../HomePage/HighlightText'
import CodedButton from '../HomePage/CodedButton'

const AboutLearningGrid = () => {
  return (
    <div className=' my-8'>
        <div className='  w-11/12 mx-auto min-h-[200px] grid grid-cols-1  lg:grid-cols-4 gap-2  '>
            {
                LearningGridArray.map((element,index)=>
                {
                    if(element.order===-1 )
                    {
                        return <div className='col-span-1 lg:col-span-2 min-h-[270px] p-4 flex flex-col gap-[1.5rem] h-full min-w-[270px]' key={index}>
                            <p className=" font-inter font-semibold text-[32px] text-white">{`${element.heading}\n`}
                            <br/>
                            <HighlightText text={element.highlightText} textanimationshow={false}/>
                            </p>
                            <p className=" font-inter font-bold text-[14px] text-richblack-400">{element.description}</p>
                            <CodedButton linkto={element.BtnLink} active={true}>
                                {element.BtnText}
                                </CodedButton>
                        </div>
                    }
                    else if(element.order!==-1 && element.order!==3)
                    {
                        return <div className={`min-h-[270px] p-4 flex flex-col gap-3 min-w-[270px] ${element.order%2===0?"bg-richblack-700":"bg-richblack-200"}`} key={index}>
                        <p className=" font-inter font-normal text-[18px] text-white">{element?.heading}
                      
                        </p>
                        <p  className=" font-inter font-bold text-[14px] text-richblack-400">{element?.description}</p>
                        
                    </div>
                    }
                    else 
                    {
                        return <div className={`min-h-[270px] p-4 bg-transparent hidden lg:block`} key={index}>
                        
                        
                    </div>
                    }
                })
            }
        </div>
    </div>
  )
}

export default AboutLearningGrid