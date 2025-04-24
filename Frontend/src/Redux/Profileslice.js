import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile =createAsyncThunk('/profile',async()=>{
    const response = await axios.get('http://localhost:8000/protect/profile',{
        withCredentials: true,
    })
    console.log(response.data)
    return response.data
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
        username:'',
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
    state.username=action.payload.Data.AccId.username
    state.profile_pic=action.payload.Data.profile_pic,
    state.cover_pic=action.payload.Data.cover_pic,
    state.Address= action.payload.Data.Address,
    state.Skill= action.payload.Data.Skill,
    state.education=action.payload.Data.education ,
    state.experience= action.payload.Data.experience,
    state.gender= action.payload.Data.gender,
    state.languages=action.payload.Data.languages ,
    state.dob=action.payload.Data.dob ,
    state.contact=action.payload.Data.contact
    state.relationship=action.payload.Data.relationship,
    state.religious= action.payload.Data.religious,
    state.isComplete=action.payload.Data.isComplete
        })
    },
    
})
export default  profileSlice.reducer