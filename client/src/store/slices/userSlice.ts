import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';

interface UserState {
  userAssets: any[];
  purchases: any[];
  wishlist: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userAssets: [],
  purchases: [],
  wishlist: [],
  loading: false,
  error: null,
};

export const fetchUserAssets = createAsyncThunk(
  'users/fetchUserAssets',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get(`${API_URL}/users/assets`, config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch user assets';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserPurchases = createAsyncThunk(
  'users/fetchUserPurchases',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get(`${API_URL}/users/purchases`, config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch user purchases';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserWishlist = createAsyncThunk(
  'users/fetchUserWishlist',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get(`${API_URL}/users/wishlist`, config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch user wishlist';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'users/addToWishlist',
  async (assetId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.post(
        `${API_URL}/users/wishlist/${assetId}`, 
        {}, 
        config
      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to add to wishlist';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'users/removeFromWishlist',
  async (assetId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`${API_URL}/users/wishlist/${assetId}`, config);
      return assetId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to remove from wishlist';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userAssets = [];
      state.purchases = [];
      state.wishlist = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user assets
      .addCase(fetchUserAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.userAssets = action.payload;
      })
      .addCase(fetchUserAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch user purchases
      .addCase(fetchUserPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload;
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch user wishlist
      .addCase(fetchUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
      })
      
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearUserData, clearError } = userSlice.actions;
export default userSlice.reducer;