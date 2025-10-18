import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    activeUser: null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      const user = action.payload;

      if (user) {
        state.activeUser = user;
        state.isAuthenticated = true;
      } 
    },
    logout(state) {
      state.isAuthenticated = false;
      state.activeUser = {};
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;

// [
//   users:[

//   ],
//   isAuthenticated:false,
//   activeUser:{}
// ]
