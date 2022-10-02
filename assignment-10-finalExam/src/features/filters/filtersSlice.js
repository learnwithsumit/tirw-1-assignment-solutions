import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchText: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { updateSearchText } = filterSlice.actions;

export default filterSlice.reducer;
