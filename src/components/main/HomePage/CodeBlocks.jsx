import React from 'react'
import CodedButton from './CodedButton'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position,heading,subheading,codebtn1,codebtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex my-20 ${position}  justify-between gap-12 `}>
      {/* //left part */}
      <div className='w-full lg:w-[50%] flex flex-col gap-2 lg:gap-8 '>
        {heading}
        <div className='text-richblack-300 font-bold'>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7 flex-col items-center md:flex-row'>
            <CodedButton active={codebtn1 && codebtn1.active} linkto={codebtn1 && codebtn1.linkto}>
                {codebtn1 && codebtn1.btnText}
                </CodedButton>

                <CodedButton active={codebtn2 && codebtn2.active} linkto={codebtn2 &&  codebtn2.linkto}>
                {codebtn2 && codebtn2.btnText}
                </CodedButton>

        </div>
      </div>
      {/* //right part */}
      {codeblock && <div className='h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px] border border-s-richblack-100 relative p-4 shadow-lg shadow-red-800'>
        <div className='bg-yellow-300 opacity-15 w-full h-full absolute '></div>
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
        <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>  
            <p>12</p> 
            <p>13</p> 
            <p>14</p> 
            <p>15</p> 
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 `}>
            <TypeAnimation
            sequence={[codeblock,800,""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
                // style: This prop is used to apply inline 
                // styles to the rendered element. In your case, you've applied
                //  the styles whiteSpace: "pre-line" and display: "block". 
                //  These styles ensure that line breaks are preserved 
                // and that the element is rendered as a block-level element.
                display:'block',
                whiteSpace:'pre-line'
            }}
            />

        </div>
      </div>}
    </div>
  )
}

export default CodeBlocks