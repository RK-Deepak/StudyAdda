
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { Home } from './page/Home';

function App() {
  return (
    <div className="App w-screen min-h-screen flex flex-col font-inter bg-richblack-900 ">
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
    </div>
  );
}

export default App;
