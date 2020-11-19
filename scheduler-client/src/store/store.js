import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice"
import registerReducer from "../features/register/registerSlice"

export default configureStore({
    reducer: {
        auth : authReducer,
        register: registerReducer,
    },
});