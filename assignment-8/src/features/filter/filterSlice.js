import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'All',
  colors: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    statusChanged: (state, action) => {
      state.status = action.payload;
    },
    colorChanged: (state, action) => {
      const colorExists = state.colors.includes(action.payload);

      if (colorExists) {
        state.colors = state.colors.filter((color) => color !== action.payload);
      } else {
        state.colors = [...state.colors, action.payload];
      }
    },
  },
});

export const { statusChanged, colorChanged } = filterSlice.actions;

export default filterSlice.reducer;
