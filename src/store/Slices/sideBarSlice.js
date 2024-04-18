import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewsideBar: false
};

const sideBarSlice = createSlice({
  name: "SideBar",
  initialState,
  reducers: {
    setSideBar: (state, action) => {
      // Toggle the value of viewsideBar
      state.viewsideBar = !state.viewsideBar;
    }
  }
});

export const { setSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
