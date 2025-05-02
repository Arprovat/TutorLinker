import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotification=createAsyncThunk('getNotification',async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get('http://localhost:8000/protect/notification',{withCredentials:true})
        return response.data
    } catch (error) {
        return rejectWithValue(error.data.massager||error.massage)
    }

})

const notificationSlice = createSlice({
    name:'notify',
    initialState:{
        notification:[],
        loading:false,
    },
    reducers:{
        setNotify(state,action){
          state.notification.unshift(action.payload)   
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getNotification.fulfilled,(state,action)=>{
            state.notification=action.payload.Data
        })
    }

})

export const {setNotify} = notificationSlice.actions
export default notificationSlice.reducer