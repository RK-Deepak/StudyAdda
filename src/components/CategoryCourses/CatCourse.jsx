import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAllCategories, getCatalogaPageData } from '../../services/operations/categoriesAPI';
import CourseSlider from './CourseSlider';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';



const CatCourse = () => {
 
 
    
 
  const {catlogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
   const [active, setActive] = useState(1);
  const {loading}=useSelector((state)=>state.profile)

  //Fetch all categories
  useEffect(()=> {
    console.log(catlogName);
      const getCategories = async() => {
          const res = await getAllCategories();
          console.log(res);
          const category_id =  res?.filter((ct) => ct.name.toLowerCase() === catlogName.toLowerCase());
          setCategoryId(category_id[0]._id);
          console.log(category_id);
      }
     
      getCategories();
  },[catlogName]);

  useEffect(() => {
      const getCategoryDetails = async() => {
        console.log(categoryId);
          try{
              const res = await getCatalogaPageData(categoryId);
              console.log("Pringting res: ", res);
              setCatalogPageData(res);
          }
          catch(error) {
              console.log(error)
          }
      }
      if(categoryId) {
          getCategoryDetails();
      }
      
  },[categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    )
  }

    

  //ititially on when ever course 
  return (
    <div className=" box-content bg-richblack-800 px-4">
       {/* Section-1 */}
       <div className="mx-auto flex min-h-[250px] max-w-maxContentTab  bg-richblack-700 p-4 flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">{`Home / Catlog /`}
        <span className="text-yellow-25">
          {" "}{catalogPageData?.selectedCategory?.name}
          </span></p>
          <p className="text-3xl text-richblack-5">{catalogPageData?.selectedCategory?.name}</p>
          <p className="max-w-[870px] text-richblack-200">{catalogPageData?.selectedCategory?.description}</p>
       </div>
       {/* Section-2 */}
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <p className="section_heading">Courses to become champ</p>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p  className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}>Most Popular</p>
                    <p className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}>New</p>
                </div>
        <CourseSlider courses={catalogPageData?.selectedCategory?.courses}/>
       </div>
       {/* Section-3 */}
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <p className="section_heading">Other Courses Not Related to {" "}{catalogPageData?.selectedCategory?.name}</p>
        <div className="py-8">
          <CourseSlider courses={catalogPageData?.differentCategory?.courses}/>
        </div>
       </div>
       {/* {Section-4} */}
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <p className="section_heading">Frequently Subscribed</p>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {
            catalogPageData?.mostSellingCourses?.slice(0,4).map((course,index)=>
            {
              return <CourseCard course={course} key={index} />
            })

          }
          </div>
       </div>

    </div>
  )
}

export default CatCourse