import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  paymentsEnabled: boolean;
  searchQuery: string;
  filters: {
    category: string;
    priceRange: [number, number];
    sort: string;
    tags: string[];
  };
}

const initialState: UiState = {
  sidebarOpen: false,
  paymentsEnabled: false,
  searchQuery: '',
  filters: {
    category: '',
    priceRange: [0, 1000],
    sort: 'newest',
    tags: [],
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    togglePayments: (state) => {
      state.paymentsEnabled = !state.paymentsEnabled;
    },
    setPaymentsEnabled: (state, action: PayloadAction<boolean>) => {
      state.paymentsEnabled = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.filters.sort = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.filters.tags.includes(action.payload)) {
        state.filters.tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.filters.tags = state.filters.tags.filter(tag => tag !== action.payload);
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        sort: 'newest',
        tags: [],
      };
      state.searchQuery = '';
    },
  },
});

export const {
  toggleSidebar,
  closeSidebar,
  openSidebar,
  togglePayments,
  setPaymentsEnabled,
  setSearchQuery,
  setCategory,
  setPriceRange,
  setSort,
  addTag,
  removeTag,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;