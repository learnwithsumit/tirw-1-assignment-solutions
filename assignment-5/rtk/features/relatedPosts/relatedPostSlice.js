const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const store = require("../../app/store");

// initial state
const initialState = {
    loading: false,
    relatedDataPosts: [],
    error: "",
};

// create async thunk
const fetchRelatedPost = createAsyncThunk("relatedPosts/fetchPosts", async (title) => {
    // console.log("Post title: ", {title});
    const url = `https://jsonplaceholder.typicode.com/posts?${title?.split(" ")?.map(word => `title_like=${word}`).join("&")}`;
    const response = await fetch(url);
    const posts = await response.json();

    return posts;
});

const relatedPostSlice = createSlice({
    name: "relatedPosts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedPost.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        }).addCase(fetchRelatedPost.fulfilled, (state, action) => {
            // console.log("Related Posts: ", action.payload);
            state.loading = false;
            state.error = "";
            state.relatedDataPosts = action.payload;
        }).addCase(fetchRelatedPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.error?.message;
            state.relatedDataPosts = [];
        });
    },
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPost = fetchRelatedPost;
module.exports.fetchRelatedPostAction = relatedPostSlice.actions;