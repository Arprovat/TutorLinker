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
      console.log(response.data,page)
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
          `http://localhost:8000/protect/like/${postId}`,
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
    async (postId,comment ,{ rejectWithValue }) => {
      try {
        await axios.post(
          `http://localhost:8000/protect/post/delete/${postId}`,comment,
          { withCredentials: true }
        );
        return postId;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],        
    status: "idle",  
    error: null
  },
  reducers: {
    likePost(state, action) {
      const post = state.items.find(p => p._id === action.payload.postId);
      if (post) {
        post.likes += 1;
      }
    },
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
      });
  }
});

export const { likePost, addComment } = postsSlice.actions;
export default postsSlice.reducer;
