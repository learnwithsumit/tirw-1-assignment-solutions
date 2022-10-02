import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  type: '',
  pagination: {
    currentPage: 1,
    limit: 10,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.pagination.currentPage = 1;
    },
    clearSearch: (state) => {
      state.search = '';
    },
    setType: (state, action) => {
      state.type = action.payload;
      state.pagination.currentPage = 1;
    },
    clearType: (state) => {
      state.type = null;
    },
    clearFilter: (state) => {
      state.search = '';
      state.type = null;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const {
  setSearch,
  clearSearch,
  setType,
  clearType,
  clearFilter,
  setPage,
} = filterSlice.actions;

export default filterSlice.reducer;
