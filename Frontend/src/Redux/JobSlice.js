import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const createJobPost = createAsyncThunk(
  'jobPost/createJobPost',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:8000/protect/createJObPost`,formData,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchAllJobPosts = createAsyncThunk(
  'jobPost/fetchAllJobPosts',
  async ({page, data},thunkAPI) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/protect/allJobPost`,
          { 
            withCredentials: true,data,
            params: {
              limit: 10,
              page,
              ...data
            }
          }
        );
        console.log(data)
      return {data:response.data,page};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchUserJobPosts = createAsyncThunk(
  'jobPost/fetchUserJobPosts',
  async (userId,thunkAPI) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/protect/getUserJobPost/${userId}`,
          { 
            withCredentials: true,
            
          }
        );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchJobPostById = createAsyncThunk(
  'jobPost/fetchJobPostById',
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/protect/getPost/${postId}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchApplicantsByPost = createAsyncThunk(
  'jobPost/fetchApplicantsByPost',
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/protect/Applicant/${postId}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const applyToJob = createAsyncThunk(
  'jobPost/applyToJob',
  async ({ postId, applicantData }, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:8000/protect/apply/${postId}`, applicantData,{withCredentials:true});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const jobPostSlice = createSlice({
  name: 'jobPost',
  initialState: {
    posts: [],
    selectedPost: {},
    applicants: [],
    UserJobpost:[],
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Create Post
      .addCase(createJobPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Job created';
        state.posts.push(action.payload.data); // optional
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllJobPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { data, page } = action.payload;
        if (page === 1) {
          state.posts = data.Data;
        } else {
          const newPosts = data.Data.filter(
            (post) => !state.posts.some((p) => p._id === post._id)
          );
          state.posts.push(...newPosts);
        }
      
      })
      .addCase(fetchAllJobPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserJobPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserJobPosts.fulfilled, (state, action) => {
        state.loading = false;    
        state.UserJobpost =action.payload.Data;
      console.log(state.UserJobpost)
      })
      
      .addCase(fetchJobPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload.Data;
        console.log("seletedpost",state.selectedPost)
      })
      .addCase(fetchJobPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchApplicantsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicantsByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload.data || [];
      })
      .addCase(fetchApplicantsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Applied successfully';
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearStatus } = jobPostSlice.actions;

export default jobPostSlice.reducer;
