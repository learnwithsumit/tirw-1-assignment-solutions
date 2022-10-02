import { getVideo, updateReaction } from './videoAPI';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  video: {},
  isLoading: false,
  isError: false,
  error: '',
};

// async thunk
export const fetchVideo = createAsyncThunk('video/fetchVideo', async (id) => {
  const video = await getVideo(id);
  return video;
});

export const updateVideoReaction = createAsyncThunk(
  '/video/updateReaction',
  async ({ id, reaction }) => {
    const updatedVideo = await updateReaction({ id, reaction });
    return updatedVideo;
  }
);
const videoSlice = createSlice({
  name: 'video',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.video = {};
        state.isError = true;
        state.error = action.error?.message;
      });
    builder
      .addCase(updateVideoReaction.pending, (state, action) => {
        // রিয়্যাক্ট হতে হতে ভিডিও ও অন্যান্য তথ্য  লোডিং হওয়ার দরকার নেই, তাই লোডিং স্টেট সেট করিনি । লোডিং স্টেট সেট করলে ভিডিও ডেসক্রিপশনের জায়গয়ায় লোডিং কম্পোনেন্ট দেখানো হয়েছে।
        return state;
      })
      .addCase(updateVideoReaction.fulfilled, (state, action) => {
        state.video.likes = action.payload.likes;
        state.video.unlikes = action.payload.unlikes;
      })
      .addCase(updateVideoReaction.rejected, (state, action) => {
        // রিয়্যাক্ট হতে গেলে এরর হওয়ার সম্ভাবনা খুবই কম। রিয়্যাক্ট এড না হলেও বাকি স্টেটগুলোও ইউজার দেখুক তাই এরর স্টেট সেট করা হয় নি। এরর স্টেট সেট করলে ভিডিও ডেসক্রিপশন সহ যাবতীয় তথ্যের পরিবর্তে এরর মেসেজ দেখানো হয়।
        return state;
      });
  },
});

export default videoSlice.reducer;
