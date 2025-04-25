import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import ProfileReducer from './Profileslice'

export default configureStore({
    reducer:{
        auth:AuthReducer,
        profile:ProfileReducer,
      
    }
})