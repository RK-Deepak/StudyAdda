import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

//AVG_REVIEW_COUNT IS WHICH WE GET FROM AVG RATING 4.5 AND STAR_SIZE IS 
//BASICALLY LEKE 30PX ETC
function RatingStars({AVG_REVIEW_COUNT,STAR_SIZE})
{
     const [starCount,setStarCount]=useState({
        full:0,
        half:0,
        empty:0
     })

     useEffect(()=>
     {
        const complete_stars=Math.floor(AVG_REVIEW_COUNT) || 0;
        setStarCount({
            full:complete_stars,
            half:Number.isInteger(AVG_REVIEW_COUNT)?0:1,
            empty:Number.isInteger(AVG_REVIEW_COUNT)?5-complete_stars : 4-complete_stars
        })

     },[AVG_REVIEW_COUNT])

     return (
        <div className="flex gap-1 text-yellow-100">
            {/* here we create array from  stars and use it and print it */}
            {
             [...new Array(starCount.full)].map((_,index)=>{
                return  <TiStarFullOutline key={index} size={STAR_SIZE || 20} />
             })
            }
            { 
                [...new Array(starCount.half)].map((_,index)=>
                {
                    return  <TiStarHalfOutline key={index} size={STAR_SIZE || 20} />
                })
             
            }
             { 
                [...new Array(starCount.empty)].map((_,index)=>
                {
                    return  <TiStarOutline key={index} size={STAR_SIZE || 20} />
                })
             
            }

        </div>
     )

}
export default RatingStars;
