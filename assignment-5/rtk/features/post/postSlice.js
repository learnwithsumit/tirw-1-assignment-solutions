const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const { fetchRelatedPost } = require("../relatedPosts/relatedPostSlice");

// initial state
const initialState = {
    loading: false,
    singleDataPost: {},
    error: "",
};

// create async thunk
const fetchPost = createAsyncThunk("post/fetchPosts", async (_, {dispatch}) => {
    const randomPostId = Math.floor(Math.random() * 100) || 1;
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/2"+randomPostId
    );
    const post = await response.json();
    // console.log("Single Post: ", post);
    dispatch(fetchRelatedPost(post.title));
    return post;
});

const postSlice = createSlice({
    name: "singlePost",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.singleDataPost = action.payload;
            
        })
        .addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.singleDataPost = [];
        });
    },
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;
