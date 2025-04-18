import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user_id:'',
    email:'',
    Access_token:"",
    IsAuthenticated:false,
}

const AuthSlice = createSlice({
    name:"auth",initialState,
    reducers:
    {
        
    }
})

export default AuthSlice.reducer;