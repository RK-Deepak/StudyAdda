import { Navigate } from "react-router-dom";

const ProtectedRoute=({children})=>
{
    const token=localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null;

    if(token===null)
    {
        return <Navigate to="/login"/>
    }
    else 
    {
        return children
    }
}
export default ProtectedRoute;