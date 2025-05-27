import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';

interface Asset {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  isFree: boolean;
  previewImages: string[];
  tags: string[];
  seller: any;
  rating: number;
  downloadCount: number;
  demoUrl?: string;
  createdAt: string;
}

interface AssetState {
  assets: Asset[];
  featuredAssets: Asset[];
  asset: Asset | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: AssetState = {
  assets: [],
  featuredAssets: [],
  asset: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (
    { page = 1, limit = 12, category = '', search = '', sort = 'newest' }: 
    { page?: number; limit?: number; category?: string; search?: string; sort?: string },
    thunkAPI
  ) => {
    try {
      let url = `${API_URL}/assets?page=${page}&limit=${limit}`;
      
      if (category) url += `&category=${category}`;
      if (search) url += `&search=${search}`;
      if (sort) url += `&sort=${sort}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch assets';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchAssetById = createAsyncThunk(
  'assets/fetchAssetById',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/assets/${id}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch asset';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchFeaturedAssets = createAsyncThunk(
  'assets/fetchFeaturedAssets',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/assets/featured`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch featured assets';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createAsset = createAsyncThunk(
  'assets/createAsset',
  async (assetData: FormData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.post(`${API_URL}/assets`, assetData, config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create asset';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    clearAsset: (state) => {
      state.asset = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.assets;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch asset by ID
      .addCase(fetchAssetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.asset = action.payload;
      })
      .addCase(fetchAssetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch featured assets
      .addCase(fetchFeaturedAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredAssets = action.payload;
      })
      .addCase(fetchFeaturedAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create asset
      .addCase(createAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsset.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAsset, clearError } = assetSlice.actions;
export default assetSlice.reducer;