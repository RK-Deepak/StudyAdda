
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

function App() {
  return (
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
   <Route>
    
   </Route>
      
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
