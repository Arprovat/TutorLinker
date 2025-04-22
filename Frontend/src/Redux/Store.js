import { ConfigureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import ProfileReducer from './Profileslice'
export default ConfigureStore({
    reducer:{
        auth:AuthReducer,
        profile:ProfileReducer,
      
    }
})