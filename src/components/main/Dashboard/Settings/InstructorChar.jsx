import React, { useState } from 'react'

import {Chart,registerables} from "chart.js"
import { Doughnut} from 'react-chartjs-2';


Chart.register(...registerables);

const InstructorChar = ({courses}) => {
    const [currChart,setcurrChart]=useState("Students");

    function generateRandomColor(numColors) {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const r = Math.floor(Math.random() * 256); // Random number between 0 and 255 for red
            const g = Math.floor(Math.random() * 256); // Random number between 0 and 255 for green
            const b = Math.floor(Math.random() * 256); // Random number between 0 and 255 for blue
            colors.push(`rgb(${r}, ${g}, ${b})`);
        }
        return colors;
    }
    

    //create data for student and course
    const chartDataForStudent ={
        labels: courses?.map((course,index)=>course.courseName,
        ),
        datasets: [
            {
                data:courses.map((course,index)=>course.studentEnrolled.length),
                backgroundColor: generateRandomColor(courses.length),
                hoverBackgroundColor: generateRandomColor(courses.length),
                borderWidth: 1,
                borderColor: 'rgb(255, 99, 187)',
                hoverBorderColor: 'rgb(255, 99, 254)',
            }]
        }
        
  //create data for income and course

  const chartDataForIncome ={
    labels: courses?.map((course,index)=>course.courseName,
    ),
    datasets: [
        {
            data:courses.map((course,index)=>course.studentEnrolled.length*course.price),
            backgroundColor: generateRandomColor(courses.length),
            hoverBackgroundColor: generateRandomColor(courses.length),
            borderWidth: 1,
            borderColor: 'rgb(255, 99, 132)',
            hoverBorderColor: 'rgb(255, 99, 132)',
        }]
    }

    const options={

    }
    
  return (
    <div className='flex flex-col gap-2 items-center w-[60%]'>
        <p className='text-white font-bold text-xl underline'>Analytical:-</p>
    <div className='flex gap-2'>
   <button onClick={()=>setcurrChart("Students") } className={`${currChart==="Students"?"bg-yellow-50 text-black":"bg-richblack-600"} px-3 py-[2px] border border-richblack-300 rounder-md`}>
    Student
   </button>
   <button onClick={()=>setcurrChart("Income")} className={`${currChart!=="Students"?"bg-yellow-50 text-black":"bg-richblack-600"} px-3 py-[2px] border border-richblack-300 rounder-md`}>
    Income
    </button >
   </div>
   <div className=''>
   <Doughnut data={currChart==="Students"?chartDataForStudent:chartDataForIncome} 
   options={options} className='max-w-[500px] aspect-square'/>
</div>
   </div>
  )
}


export default InstructorChar