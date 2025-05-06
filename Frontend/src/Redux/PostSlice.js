import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/protect/CreatePost",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/protect/post?limit=10&page=${page}`,
        { withCredentials: true }
      );
      return {data:response.data,page};
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/protect/edit/${postId}`,
        updates,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:8000/protect/post/delete/${postId}`,
        { withCredentials: true }
      );
      return postId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const LikePost = createAsyncThunk(
    "LikePost",
    async (postId, { rejectWithValue }) => {
      try {
      const response =  await axios.post(
          `http://localhost:8000/protect/like/${postId}`,{},
          { withCredentials: true }
        );
        return response.data
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const commentPost = createAsyncThunk(
    "commentPost",
    async ({ postId, comment },{ rejectWithValue }) => {
      try {
        console.log(postId,comment)
        const response=await axios.post(
          `http://localhost:8000/protect/comment/${postId}`,{comment},
          { withCredentials: true }
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  export const getAPost = createAsyncThunk(
    "getAPost",
    async (postId ,{ rejectWithValue }) => {
      try {
        const response=await axios.get(
          `http://localhost:8000/protect/getAPost/${postId}`,
          { withCredentials: true }
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const getUserPost = createAsyncThunk('getUserPost',async(userId,{ rejectWithValue })=>{
    try {
        const response = await axios.get(`http://localhost:8000/protect/userPost/${userId}`,{
            withCredentials:true
        })
        console.log(response.data)
        return response.data
        
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);

    }
  })
// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    userPost:[],
    singlePost:{},
    status: "idle",  
    error: null,
    loading:false
  },
  reducers: {
    AddLike(state, action) {
      const { postId, userId } = action.payload;
      
      const postInList = state.posts.find(p => p._id === postId);
      if (postInList) {
        if(postInList.likes.includes(userId)) {
          postInList.likeCount -= 1;
          postInList.likes = postInList.likes.filter(id => id !== userId);
        } else {
          postInList.likeCount += 1;
          postInList.likes.push(userId);
        }
      
  
      if(state.singlePost._id === postId) {
        if(state.singlePost.likes.includes(userId)) {
          state.singlePost.likeCount -= 1;
          state.singlePost.likes = state.singlePost.likes.filter(id => id !== userId);
        } else {
          state.singlePost.likeCount += 1;
          state.singlePost.likes.push(userId);
        }
      }
    }},
  
    addComment(state, action) {
      const { postId, comment } = action.payload;
      const post = state.items.find(p => p._id === postId);
      if (post) {
        post.comments.push(comment);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createPost.pending, state => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload.Data);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
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

      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updated = action.payload.Data;
        const index = state.posts.findIndex(p => p._id === updated._id);
        if (index !== -1) state.posts[index] = updated;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.posts.filter(p => p._id !== action.payload.Data._id);
      })
      .addCase(getUserPost.fulfilled,(state,action)=>{
            state.userPost= action.payload.Data
      })
      .addCase(getUserPost.rejected,(state,action)=>{
        state.error=action.payload.message
      })
      .addCase(commentPost.fulfilled,(state,action)=>{
        console.log("comment",action.payload.Data)
        state.singlePost=action.payload.Data
      })
      .addCase(commentPost.rejected,(state,action)=>{
        console.log('hit')
        state.loading=false
        state.error=action.payload.message
      })
      .addCase(getAPost.fulfilled,(state,action)=>{
        console.log(action.payload.Data)
        state.loading=false
        state.singlePost=action.payload.Data
        console.log("oo",state.singlePost)
      })
      .addCase(getAPost.pending,(state)=>{
        state.loading=true
      })
      .addCase(getAPost.rejected,(state)=>{
        state.loading=true
      })
      .addCase(LikePost.fulfilled,(state,)=>{
        
        state.loading=false
        
      })
      .addCase(LikePost.pending,(state)=>{
        state.loading=true
      })
      .addCase(LikePost.rejected,(state)=>{
        state.loading=true
      })
  }
});

export const { AddLike, addComment } = postsSlice.actions;
export default postsSlice.reducer;