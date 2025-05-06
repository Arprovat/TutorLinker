import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for CRUD operations on profile
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async () => {
    const response = await axios.get('http://localhost:8000/protect/profile', {
      withCredentials: true,
    });
    return response.data;
  }
);

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/protect/EditProfile',
        updateData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'profile/deleteAccount',
  async (userId) => {
    const response = await axios.post(
      'http://localhost:8000/protect/DeleteAccount',
      { userId },
      { withCredentials: true }
    );
    return response.data;
  }
);
export const getAProfile =  createAsyncThunk('getAProfile',async(userId,{rejectWithValue})=>{
try {
  const response = await axios.get(`http://localhost:8000/protect/getAProfile/${userId}`,
    { withCredentials: true })
return response.data
} catch (error) {
  return rejectWithValue(error)
}
})
export const SearchUser = createAsyncThunk('SearchUser',async(searchQuery)=>{
const response = await axios.get(`http://localhost:8000/protect/search/${searchQuery}`,{
  withCredentials:true
})
return response.data
})
export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwords) => {
    const response = await axios.post(
      'http://localhost:8000/protect/changePassword',
      passwords,
      { withCredentials: true }
    );
    return response.data;
  }
);

const initialState = {
 currentUser:{ AccId:'',
  username: '',
  profile_pic: '',
  cover_pic: '',
  address: '',
  skill: [],
  education: [],
  experience: [],
  gender: '',
  languages: [],
  dob: '',
  contact: { phone: '', Email: '' },
  relationship: '',
  religious: '',
  isComplete: false,},
  otherProfile:{},
  searchUser:[],
  loading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAddress(state, action) {
      state.currentUser.address = action.payload;
    },
    setdob(state, action) {
      state.currentUser.dob = action.payload;
    },
    setReligious(state, action) {
      state.currentUser.religious = action.payload;
    },
    setRelationShip(state, action) {
      state.currentUser.relationship = action.payload;
    },
    setInfo(state, action) {
      const { field, value } = action.payload;
      if (Array.isArray(state.currentUser[field])) {
        state[field].push(value);
      }
    },
    
    removeEducation(state, action) {
      state.currentUser.education.splice(action.payload, 1);
    },
   
    updateExperience(state, action) {
      const { index, item } = action.payload;
      if (state.currentUser.experience[index]) state.currentUser.experience[index] = item;
    },
    removeExperience(state, action) {
      state.currentUser.experience.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.Data;
        state.currentUser.AccId = data.AccId
        state.currentUser.username = data.AccId.username;
        state.currentUser.profile_pic = data.profile_pic;
        state.currentUser.cover_pic = data.cover_pic;
        state.currentUser.address = data.address;
        state.currentUser.skill = data.skill;
        state.currentUser.education = data.education;
        state.currentUser.experience = data.experience;
        state.currentUser.gender = data.gender;
        state.currentUser.languages = data.languages;
        state.currentUser.dob = data.dob;
        state.currentUser.contact = data.contact;
        state.currentUser.relationship = data.relationship;
        state.currentUser.religious = data.religious;
        state.currentUser.isComplete = data.isComplete;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.Data;
        state.currentUser.AccId = data.AccId
        state.currentUser.username = data.AccId.username;
        state.currentUser.profile_pic = data.profile_pic;
        state.currentUser.cover_pic = data.cover_pic;
        state.currentUser.address = data.address;
        state.currentUser.skill = data.skill;
        state.currentUser.education = data.education;
        state.currentUser.experience = data.experience;
        state.currentUser.gender = data.gender;
        state.currentUser.languages = data.languages;
        state.currentUser.dob = data.dob;
        state.currentUser.contact = data.contact;
        state.currentUser.relationship = data.relationship;
        state.currentUser.religious = data.religious;
        state.currentUser.isComplete = data.isComplete;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      .addCase(deleteAccount.fulfilled, () => {
        return initialState;
      })
      .addCase(getAProfile.fulfilled, (state,action) => {
        state.loading = false;

        state.otherProfile = action.payload.Data
        console.log(state.Profile)
      })
      .addCase(getAProfile.rejected,(state)=>{
        state.loading =true
      })
      .addCase(SearchUser.fulfilled, (state,action) => {
        state.loading = false;

        state.searchUser = action.payload.Data
        
      })
      .addCase(SearchUser.rejected,(state)=>{
        state.loading =true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setAddress,
  setdob,
  setReligious,
  setRelationShip,
  setInfo,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
} = profileSlice.actions;

export default profileSlice.reducer;
