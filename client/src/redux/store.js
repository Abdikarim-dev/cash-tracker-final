import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth.js";
import userReducer from "./User/User.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
