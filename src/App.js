
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { Home } from './page/Home';
import Header from './components/main/common/Header';
import Footer from './components/main/common/Footer';
import Login from './page/Login';
import Signup from './page/Signup';
import OpenRoute from './components/main/Auth/OpenRoute';
import VerifyEmail from './components/main/Auth/VerifyEmail';
import ForgetPass from './components/main/Auth/ForgetPass';
import UpdatePassword from './components/main/Auth/UpdatePassword';
import About from './page/About';
import { Contactinfo } from './page/ContactInfo';
import Dashboard from './page/Dashboard';
import Myprofile from './components/main/Dashboard/Myprofile';
import Settings from './components/main/Dashboard/Settings';
import ProtectedRoute from './components/main/Auth/ProtectedRoute';
import MyCourse from "./components/main/Dashboard/MyCourses/MyCourse.jsx"
import  { CourseCreationProcess } from './components/main/Dashboard/AddCourse';
import Enrolled from './components/main/Dashboard/Enrolled';
import Cart from './components/main/Dashboard/Cart';
import Purchase from './components/main/Dashboard/Purchase';
import ConfirmationModel from './components/main/Dashboard/ConfirmationModel';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/contants';
import EditCourse from './components/main/Dashboard/EditCourse/EditCourse.jsx';
import CatCourse from './components/CategoryCourses/CatCourse.jsx';
import Catlog from './page/Catlog.jsx';
import CourseDetails from './page/CourseDetails.jsx';
import VideoDetails from './page/VideoDetails.jsx';

function App() {
  const [showConfirmationModel,setShowConfirmationModel]=useState(false);
  const {user}=useSelector((store)=>store.profile)
 
  return (
    <>
    {showConfirmationModel &&  <ConfirmationModel setShowConfirmationModel={setShowConfirmationModel}/>}
    <div className="App w-screen min-h-screen flex flex-col font-inter bg-richblack-900 ">
      <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='login' element={
        <OpenRoute>
      <Login/>
      </OpenRoute>
      }/>
      <Route path='signup' element={
        <OpenRoute>
      <Signup/>
      </OpenRoute>
      }/>
      <Route path="verify-email" element={
        <OpenRoute>
          <VerifyEmail/>
        </OpenRoute>
      }
        />

<Route path="forgot-password" element={
        <OpenRoute>
          <ForgetPass/>
        </OpenRoute>
      }
        />

<Route path="update-password/:id" element={
        <OpenRoute>
          <UpdatePassword/>
        </OpenRoute>
      }
        />
        <Route path="about" element={
        <OpenRoute>
          <About/>
        </OpenRoute>
      }
        />
         <Route path="contact" element={
        <OpenRoute>
          <Contactinfo/>
        </OpenRoute>
      }
        />
   <Route element={
    <ProtectedRoute>
   <Dashboard setShowConfirmationModel={setShowConfirmationModel}/>
   </ProtectedRoute>
   }

   >
   
      <Route path="dashboard/my-profile" element={<Myprofile/>}/>
      <Route path="dashboard/settings" element={<Settings/> }/>
      <Route path="dashboard/enrolled-courses" element={<Enrolled/>}/>
      <Route path="dashboard/wishlist" element={<Cart/>}/>
      <Route path="dashboard/purchase-history" element={<Purchase/>}/>
      <Route path="dashboard/instructor" element={ <Myprofile/>}/>

      <Route path="dashboard/add-course" element={ <CourseCreationProcess/> }/>
      <Route path="dashboard/my-courses" element={<MyCourse/>}/>
      <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
         
      
    
   </Route>
   <Route path="catlog/:catlogName" element={<Catlog/>}/>
   <Route path="/courses/:courseId" element={<CourseDetails/>}/>


      
     </Routes>
     <Footer/>
    </div>
    </>
  );
}

export default App;
