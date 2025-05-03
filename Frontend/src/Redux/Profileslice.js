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
  isComplete: false,
  loading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setdob(state, action) {
      state.dob = action.payload;
    },
    setReligious(state, action) {
      state.religious = action.payload;
    },
    setRelationShip(state, action) {
      state.relationship = action.payload;
    },
    setInfo(state, action) {
      const { field, value } = action.payload;
      if (Array.isArray(state[field])) {
        state[field].push(value);
      }
    },
    // Structured array operations
    
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
    },
   
    updateExperience(state, action) {
      const { index, item } = action.payload;
      if (state.experience[index]) state.experience[index] = item;
    },
    removeExperience(state, action) {
      state.experience.splice(action.payload, 1);
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
        state.username = data.AccId.username;
        state.profile_pic = data.profile_pic;
        state.cover_pic = data.cover_pic;
        state.address = data.address;
        state.skill = data.skill;
        state.education = data.education;
        state.experience = data.experience;
        state.gender = data.gender;
        state.languages = data.languages;
        state.dob = data.dob;
        state.contact = data.contact;
        state.relationship = data.relationship;
        state.religious = data.religious;
        state.isComplete = data.isComplete;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // editProfile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.Data;
        state.profile_pic = data.profile_pic;
        state.cover_pic = data.cover_pic;
        state.address = data.address;
        state.skill = data.skill;
        state.education = data.education;
        state.experience = data.experience;
        state.gender = data.gender;
        state.languages = data.languages;
        state.dob = data.dob;
        state.contact = data.contact;
        state.relationship = data.relationship;
        state.religious = data.religious;
        state.isComplete = data.isComplete;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      .addCase(deleteAccount.fulfilled, () => {
        return initialState;
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
