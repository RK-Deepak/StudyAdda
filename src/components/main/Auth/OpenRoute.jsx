import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";




function OpenRoute({children})
{
const location=useLocation();
    const token=useSelector((store)=>store.auth.token)
    //if user do not have token it will redirect it to that page
    if(token===null || token!==null) 
    {
        return children;
    }

}

export default OpenRoute