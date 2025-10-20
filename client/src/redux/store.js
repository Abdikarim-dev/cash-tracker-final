import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth.js";
import userReducer from "./User/User.js";
import accountReducer from "./Account/Account.js";
import transactionReducer from "./Transaction/Transaction.js";
import transferAmountReducer from "./TransferAmount/TransferAmount.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    account: accountReducer,
    transaction: transactionReducer,
    transferAmount: transferAmountReducer,
  },
});

export default store;
