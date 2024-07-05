import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userDetailsReducer from "./userDetailsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        userDetails: userDetailsReducer, 
    }
})
export default store;