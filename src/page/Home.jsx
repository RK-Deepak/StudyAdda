import React from 'react'
import HighlightText from '../components/main/HomePage/HighlightText'
import CodedButton from '../components/main/HomePage/CodedButton'
import {FaArrowRight}  from "react-icons/fa";
import { Link } from 'react-router-dom';
import banner from "../assets/Images/banner.mp4"
import ReactPlayer from 'react-player';
import programmingLanguages from '../data/programmingLanguage';
import CodeBlocks from '../components/main/HomePage/CodeBlocks';


export const Home=()=>
{
    return (
    <div>
        {/* Section-1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent
        items-center text-white justify-between'>
         <div className='text-center text-4xl font-semibold mt-7 flex flex-col items-center gap-2'>
            <span>Be Like Shivaji Maharaj In Your Future With</span>
            <HighlightText text={"Coding Skills"} textanimationshow={true}/>
         </div>
         <div className='mt-4 w-[70%] text-center text-lg font-bold text-richblack-300 '>
         "With our online learning platform, you can study comfortably,
          no matter where you are. You'll have tons of materials available,
           like practical assignments, quizzes, and helpful advice from teachers. 
         Take your time and learn at your own speed!" 
         </div>
         <div className='flex flex-row gap-7 mt-8'>
         <CodedButton active={true} linkto={"/signup"}>
           Learn More
         </CodedButton>
         <CodedButton active={false} linkto={"/login"}>
           Take a Demo
         </CodedButton>
        
         </div>
         <Link to="/signup">
            <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit group border border-white shadow shadow-richblack-200'>
                <div className=' group flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900 group-hover:underline underline-offset-4 '>
                <p>Be a Guru</p>
                <FaArrowRight className=' group-hover:translate-x-2  transition-all duration-150'/>
                </div>
                

            </div>
         </Link>
         <div className='mx-3 my-12 shadow-blue-200 relative z-10 w-[80%] h-full'>
         <ReactPlayer url={banner} muted playing loop width="100%" className="react-layer"/>
           <div className='absolute w-[100%] h-[100%] p-3 gap-5 justify-between bg-richblack-700 top-2 flex flex-row flex-wrap left-2 -z-10 text-white rounded-md overflow-clip shadow shadow-richblack-200'>
            {
                programmingLanguages.map((language,index)=>
                {
                   return <span key={index} className='font-bold underline underline-offset-2 hidden sm:block hover:text-red-500 '>{language}</span>
                    
                })
            }
           </div>
            <div className=''/>
        
           
            </div>
            {/* Code Section-1 */}
            <div className='w-[90%] mx-auto'>
                <CodeBlocks position={"lg:flex-row"} heading={
                    <div className='text-4xl font-semibold flex items-center gap-2 '>
                     Explore Your
                     <HighlightText text={"True Potential"} textanimationshow={false}/>
                    </div>

                }
                subheading={
                    "Our tutorials are designed and taught by  tech-experts , who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                codebtn1={
                    {
                        btnText:"Try it out",
                        linkto:"/signup",
                        active:true
                    }
                }
                codebtn2={
                    {
                        btnText:"Explore More",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link  rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1>\n<a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-50"}
                >


                </CodeBlocks>

                
                
            </div>
            
                {/* Code Section-2 */}

                <div className='w-[90%] mx-auto'>
                <CodeBlocks position={"lg:flex-row-reverse"} heading={
                    <div className='text-4xl font-semibold flex items-center gap-2 '>
                    Start Journey
                     <HighlightText text={"In Seconds"} textanimationshow={false}/>
                    </div>

                }
                subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                codebtn1={
                    {
                        btnText:"Let's Learn",
                        linkto:"/signup",
                        active:true
                    }
                }
                codebtn2={
                    {
                        btnText:"Explore More",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={`def greet(name):\n print(f"Hello, {name}!") \ndef square(x):\nreturn x * x\n if __name__ == "__main__":\nname = input("Enter your name: ")\ngreet(name)\nnum = int(input("Enter a number: "))\nresult = square(num)\nprintf("The square of {num} is {result}."]\nnum2 = int(input("Enter another number: "))\nresult2 = cube(num2)\nprintf("The cube of {num2} is {result2}."\nprintf("This is final"))
            `}
                codeColor={"text-green-600"}
                >


                </CodeBlocks>

                
                
            </div>
                
          
        </div>
        {/* Section-2 */}
        {/* Section-3 */}
        {/* Section-4 */}
    </div>)
}