
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

import ConfirmationModel from './components/main/Dashboard/ConfirmationModel';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import EditCourse from './components/main/Dashboard/EditCourse/EditCourse.jsx';

import Catlog from './page/Catlog.jsx';
import CourseDetails from './page/CourseDetails.jsx';
import ViewCourse from './page/ViewCourse.jsx';
import VideoDetails from './components/main/VideoCourse/VideoDetails.jsx';
import InstructorDashboard from './components/main/Dashboard/InstructorDashboard/InstructorDashboard.jsx';

import InstructorCategory from './page/InstructorCategory.jsx';
import PurchaseDetails from './components/main/Dashboard/PurchaseDetails/PurchaseDetails.jsx';
import VideoCallPage from './page/VideoCallPage.jsx';
import VideoCallRoom from './components/main/common/VideoCall/VideoCallRoom.jsx';
import VIdeoCall from './components/main/common/VideoCall/VIdeoCall.jsx';
import Error from './page/Error.jsx';




function App() {
  const [showConfirmationModel,setShowConfirmationModel]=useState(false);
  const {user}=useSelector((store)=>store.profile);  

  return (
    <>
    {showConfirmationModel &&  <ConfirmationModel setShowConfirmationModel={setShowConfirmationModel}/>}
   
    <div className="App w-screen min-h-screen flex flex-col font-inter bg-richblack-900 ">
      
      <Header/>
     <Routes>
      {/* home path */}
      <Route path='/' element={<Home/>}/>

      {/* error path */}
      <Route path='*' element={<Error/>}/>

      {/* auth path */}
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

    {/* About page */}
        <Route path="about" element={
        <OpenRoute>
          <About/>
        </OpenRoute>
      }
        />

    {/* contact page */}
         <Route path="contact" element={
        <OpenRoute>
          <Contactinfo/>
        </OpenRoute>
      }
        />

        {/* Dashboard path */}
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
      <Route path="dashboard/purchase-history" element={<PurchaseDetails/>}/>
      <Route path="dashboard/instructor" element={ <InstructorDashboard/>}/>
  

      <Route path="dashboard/add-course" element={ <CourseCreationProcess/> }/>
      <Route path="dashboard/my-courses" element={<MyCourse/>}/>
      <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
         
      
    
   </Route>
   <Route path="catlog/:catlogName" element={<Catlog/>}/>
   <Route path="/courses/:courseId" element={<CourseDetails/>}/>
   {
    user && user.accountType==="Admin" && 
    <Route path='/category-create' element={<InstructorCategory/>}/>
  }

{/* Video Watch Path */}
 <Route element={<ProtectedRoute>
  <ViewCourse/>
 </ProtectedRoute>}>

  {
    user?.accountType==="Student" && 
    
    <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails/>}/>

  }



 </Route>

 {/* Video Call Route */}
{user ? user.accountType==="Student" && 
<Route element={<VideoCallPage/>}>
<Route path="peerToPeer/videoCall" element={<VIdeoCall/>}/>
 
  <Route path="/peerToPeer/videoCall/:userId/:roomId" element={<VideoCallRoom/>}/>
  </Route>:<Route path='*' element={<Error/>}/>}
  

      
     </Routes>
     <Footer/>
    </div>
    </>
  );
}

export default App;
