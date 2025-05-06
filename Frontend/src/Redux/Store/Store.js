import { ConfigureStore } from '@reduxjs/toolkit';
import authReducer from '../Slice/AuthSlice';
import profileReducer from '../Slice/profileSlice';
export default ConfigureStore({
    reducer:{
        auth:authReducer,
        profile: profileReducer
    }
})