import { ACCOUNT_TYPE } from "../utils/contants.js";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: [ACCOUNT_TYPE.INSTRUCTOR, ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.STUDENT],
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: [ACCOUNT_TYPE.INSTRUCTOR],
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: [ACCOUNT_TYPE.INSTRUCTOR],
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: [ACCOUNT_TYPE.STUDENT],
    icon: "VscHeartFilled",
  },
  {
    id: 5,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: [ACCOUNT_TYPE.INSTRUCTOR],
    icon: "VscAdd",
  },
  {
    id: 6,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: [ACCOUNT_TYPE.STUDENT],
    icon: "VscMortarBoard",
  },
  {
    id: 7,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: [ACCOUNT_TYPE.STUDENT],
    icon: "VscHistory",
  },
  {
    id: 8,
    name: "Settings",
    path: "/dashboard/settings",
    type: [ACCOUNT_TYPE.INSTRUCTOR, ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.STUDENT],
    icon: "MdOutlineSettingsSuggest",
  },
  {
    id: 9,
    name: "Logout",
    path: "/",
    type: [ACCOUNT_TYPE.INSTRUCTOR, ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.STUDENT],
    icon: "MdLogout",
  },
];
