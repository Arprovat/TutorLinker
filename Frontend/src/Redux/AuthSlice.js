import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const Logout = createAsyncThunk(
    "Logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/protect/Logout",
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
const initialState = {
    userId: '',
    username: '',
    role: '',
    isAuth: false,
    socket: null,
    onlineUser: [],
    coordinates:[],
    status : null,
    error :null ,

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload._id,
            state.username = action.payload.username
            state.role = action.payload.role
            state.isAuth = true
        },
        setCoordinate:(state,action)=>{
            console.log(action.payload)
        state.coordinates=action.payload
        

        },
        setSocket: (state, action) => {
            state.socket = action.payload
            console.log(state.socket)
        },
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(Logout.pending, state => {
                state.status = "loading";
            })
            .addCase(Logout.fulfilled, (state) => {
                state.status = "succeeded";
                state.userId = null,
                    state.username = ''
                state.isAuth = false
            })
            .addCase(Logout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }
})
export const { login,setCoordinate, logout, setSocket, setOnlineUser } = authSlice.actions
export default authSlice.reducer