import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userId:null,
    username:'',  
    role:'',
    isAuth:false,
    socket:null,
    onlineUser:[]

}

export const authSlice = createSlice({
name:'auth',
initialState,
reducers:{
login:(state,action)=>{
    state.userId=action.payload._id,
    state.username=action.payload.username
    state.role=action.payload.role
    state.isAuth=true
},
setSocket:(state,action)=>{
    state.socket=action.payload
},
setOnlineUser:(state,action)=>{
    state.onlineUser=action.payload
},
logout:(state)=>{
    state.userId=null,
    state.username=''
    state.isAuth=false
}
}
})
export const {login,logout,setSocket,setOnlineUser} =authSlice.actions
export default authSlice.reducer