import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth.js";
import userReducer from "./User/User.js";
import accountReducer from "./Account/Account.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    account: accountReducer,
  },
});

export default store;
