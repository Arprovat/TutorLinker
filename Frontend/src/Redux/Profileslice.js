import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile =createAsyncThunk('/profile',async()=>{
    const response = await axios.get('http://localhost:8000/protect/profile',{
        withCredentials: true,
    })
    return response.data.data
})
export const editProfile =createAsyncThunk('/editprofile',async(updateData)=>{
    try {
        const response = await axios.post('http://localhost:8000/protect/EditProfile',updateData,{
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        return isRejectedWithValue(error.response.data)
    }
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
    address: '',
    skill: [],
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
    reducers:{
        setInfo:(state,action)=>{
       const {field,value}=action.payload
       if (Array.isArray(state[field])) {
        state[field].push(value)
       }
        },
        setAddress:(state,action)=>{
            state.address = action.payload
        },
        setdob:(state,action)=>{
            state.dob=action.payload
        },
        setReligious:(state,action)=>{
            state.religious=action.payload
        },
        setRelationShip:(state,action)=>{
            state.relationship=action.payload
        }
    },
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
    .addCase(editProfile.fulfilled,(state,action)=>{
            state.loading=false,
        state.profile_pic=action.payload.Data.profile_pic,
        state.cover_pic=action.payload.Data.cover_pic,
        state.address= action.payload.Data.Address,
        state.skill= action.payload.Data.Skill,
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
        .addCase(editProfile.rejected,(state)=>{
            state.loading =true
        })
        
    }
    
})
export const {setAddress,setdob,setInfo,setRelationShip,setReligious}=profileSlice.actions
export default  profileSlice.reducer