import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/protect/';

// Async thunks for CRUD operations
export const fetchAllConnections = createAsyncThunk(
  'connection/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/getAllConnection`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchConnectionRequests = createAsyncThunk(
  'connection/fetchRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/getRequestUser`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const acceptConnection = createAsyncThunk(
  'connection/accept',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/accept/${id}`);
      return { id, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const rejectConnection = createAsyncThunk(
  'connection/reject',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/reject/${id}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const sendConnectionRequest = createAsyncThunk(
  'connection/sendRequest',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/sendRequest/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  list: [],            
  requests: [],        
  loading: false,      
  actionLoading: false,
  error: null          
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: builder => {
    // Fetch all
    builder
      .addCase(fetchAllConnections.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllConnections.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllConnections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch requests
      .addCase(fetchConnectionRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnectionRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchConnectionRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Accept
      .addCase(acceptConnection.pending, state => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(acceptConnection.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Move from requests to connections
        const { id, data } = action.payload;
        state.requests = state.requests.filter(req => req._id !== id);
        state.list.push(data);
      })
      .addCase(acceptConnection.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Reject
      .addCase(rejectConnection.pending, (state )=> {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(rejectConnection.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Remove from requests
        state.requests = state.requests.filter(req => req._id !== action.payload);
      })
      .addCase(rejectConnection.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Send
      .addCase(sendConnectionRequest.pending,( state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Optionally add to requests/outgoing
        state.list.push(action.payload);
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = connectionSlice.actions;
export default connectionSlice.reducer;
