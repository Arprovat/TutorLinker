import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import ProfileReducer from './Profileslice'
import PostReducer from './PostSlice'
import ConnectionReducer from './connection'
import NotificationReducer from './Notification'
import JobPostReducer from './JobSlice'
export default configureStore({
    reducer:{
        auth:AuthReducer,
        profile:ProfileReducer,
        post:PostReducer,
        jobPost:JobPostReducer,
        Notification:NotificationReducer,
        connection:ConnectionReducer

    }
})