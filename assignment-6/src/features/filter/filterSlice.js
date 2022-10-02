import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  search: '',
  author: null,
  pagination: {
    currentPage: 1,
    limit: 5,
    totalCount: 1,
  },
};

const filterSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    tagSelected: (state, action) => {
      state.tags.push(action.payload);
    },
    tagRemoved: (state, action) => {
      const indexToRemove = state.tags.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.tags.splice(indexToRemove, 1);
      }
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    clearAuthor: (state, action) => {
      state.author = null;
    },
    setLimit: (state, action) => {
      state.pagination.limit = parseInt(action.payload) || 5;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = parseInt(action.payload) || 1;
    },
    setTotalCount: (state, action) => {
      state.pagination.totalCount = parseInt(action.payload) || 1;
    },
    clearFilters: (state) => {
      state.tags = [];
      state.search = '';
      state.author = null;
    },
  },
});

export default filterSlice.reducer;
export const {
  tagSelected,
  tagRemoved,
  searched,
  clearFilters,
  setAuthor,
  clearAuthor,
  setPage,
  setLimit,
  setTotalCount,
} = filterSlice.actions;
