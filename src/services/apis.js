const BASE_URL=process.env.REACT_APP_BASE_URL


//AUTH ENDPOINTS 
export const endpoints={
    SENDOTP_API:BASE_URL+"/auth/sendOtp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    RESETPASSWORDTOKEN_API:BASE_URL+"/auth/reset_password_token",
    RESETPASSWORD_API:BASE_URL+"/auth/reset_password",
}

//PROFILE ENDPOINTS
export const profileEndpoints={
    GET_USER_DETAILS_API:BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API:BASE_URL + "/profile/getEnrolledCourses"
    
}
//CATEGORIES ENDPOINTS
export const categories=
{
    CATEGORIES_API:BASE_URL+"/course/getAllCategories",
    CATEGORIES_DETAILS_API:BASE_URL+"/course/categoryPageDetails",
    GET_ALL_CATEGORIES_DETAILS_API:BASE_URL+"/course/categoryPageDetails"
}
//CONTACT FORM ENDPOINTS
export const contactAPI={
    CONTACT_API:BASE_URL+"/contact/createContact"
}
//SETTINGS PAGE API
export const settingsEndpoints= {
    UPDATE_DISPLAY_PICTURE_API:BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API:BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API:BASE_URL + "/profile/deleteAccount"

}

//COURSE APIS
export const courseEndPoints={
    CREATE_COURSE_API:BASE_URL+"/course/createCourse",
    GET_ALL_COURSE_API:BASE_URL+"/course/getAllCourses",
    EDIT_COURSE_API:BASE_URL+"/course/editCourse",
    CREATE_SECTION_API:BASE_URL+"/course/createSection",
    EDIT_SECTION_API:BASE_URL+"/course/updateSection",
    DELETE_SECTION_API:BASE_URL +"/course/deleteSection",
    CREATE_SUBSECTION_API:BASE_URL+"/course/createSubSection",
    UPDATE_SUBSECTION_API:BASE_URL+"/course/updateSubSection",
    DELETE_SUBSECTION_API:BASE_URL+"/course/deleteSubSection",
    GET_ALL_COURSE_INSTRUCTOR_API:BASE_URL+"/course/getInstructorCourses",
    DELETE_SELECTED_COURSE_API:BASE_URL+"/course/deleteCourse",
    GET_COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetails",
    CREATE_RATING_API:BASE_URL+"/course/createRating",
    LECTURE_COMPLETION_API:BASE_URL+"/course/updateCourseProgress"

    
}
export const studentCourseBuyEndpoints={
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}
