const BASE_URL=process.env.REACT_APP_BASE_URL


//AUTH ENDPOINTS 
export const endpoints={
    SENDOTP_API:BASE_URL+"/auth/sendOtp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    RESETPASSWORDTOKEN_API:BASE_URL+"/auth/reset_password_token",
    RESETPASSWORD_API:BASE_URL+"/auth/reset_password"


}
//CATEGORIES ENDPOINTS
export const categories=
{
    CATEGORIES_API:BASE_URL+"/course/getAllCategories"
}
//CONTACT FORM ENDPOINTS
export const contactAPI={
    CONTACT_API:BASE_URL+"/contact/createContact"
}