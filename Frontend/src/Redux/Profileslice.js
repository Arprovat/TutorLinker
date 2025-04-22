import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile =createAsyncThunk('/profile',async()=>{
    const response = await axios.get('http://localhost:8000/protect/profile',{
        withCredentials: true,
    })
    return response.data.data
})
export const editProfile =createAsyncThunk('/editprofile',async(updateData)=>{
    const response = await axios.post('http://localhost:8000/protect/EditProfile',updateData,{
        withCredentials: true,
    })
    return response.data
})
export const DeleteAccount =createAsyncThunk('/DeleteAccount',async(userId)=>{
    const response = await axios.post('http://localhost:8000/protect/DeleteAccount',userId,{
        withCredentials: true,
    })
    return response.data
})

export const changePassword =createAsyncThunk('/changePassword',async(password)=>{
    const response = await axios.get('http://localhost:8000/protect/profile',password,{
        withCredentials: true,
    })
    return response.data
})

export const profileSlice = createSlice({
    name:'profile',
    initialState:{
        profile_pic:'',
    cover_pic:'',
    Address: '',
    Skill: [],
    education: [],
    experience: [],
    gender: '',
    languages: [],
    dob: '',
    contact:{
        phone:'',
        Email:''
    },
    relationship:'',
    religious: '',
    isComplete:false,
    loading:true
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
    .addCase(getProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProfile.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getProfile.fulfilled,(state,action)=>{
    state.loading=false,
    state.profile_pic=action.payload.profile_pic,
    state.cover_pic=action.payload.cover_pic,
    state.Address= action.payload.Address,
    state.Skill= action.payload.Skill,
    state.education=action.payload.education ,
    state.experience= action.payload.experience,
    state.gender= action.payload.gender,
    state.languages=action.payload.languages ,
    state.dob=action.payload.dob ,
    state.contact=action.payload.contact
    state.relationship=action.payload.relationship,
    state.religious= action.payload.religious,
    state.isComplete=action.payload.isComplete
        })
    },
    
})
export default  profileSlice.reducer