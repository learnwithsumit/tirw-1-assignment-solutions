import { getVideos } from './videosAPI';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  isLoading: false,
  isError: false,
  error: '',
};

// async thunk for fetch videos
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async ({ tags, search, author, limit, currentPage }) => {
    const videosObj = await getVideos({
      tags,
      search,
      author,
      limit,
      currentPage,
    });
    return videosObj;
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload.videos;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.videos = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default videoSlice.reducer;
