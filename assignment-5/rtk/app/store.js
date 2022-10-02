const configureStore = require("@reduxjs/toolkit").configureStore;
const postReducer = require("../features/post/postSlice");
const relatedPostReduces = require("../features/relatedPosts/relatedPostSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        singlePost: postReducer,
        relatedPosts: relatedPostReduces,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

module.exports = store;
