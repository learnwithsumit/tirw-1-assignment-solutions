const express = require("express");
const store = require("../rtk/app/store");
const { fetchPost } = require("../rtk/features/post/postSlice");
const router = express.Router();
// Just simple info for root api endpoint
router.get("/result", (_, res)  => {
    // console.log("Redux Store: ", store.getState());
    store.dispatch(fetchPost());
    const {singlePost, relatedPosts} = store.getState();
    const {singleDataPost} = singlePost;
    const {relatedDataPosts} = relatedPosts;
    res.status(200).json({
        singleDataPost:{
            ...singleDataPost,
        },
        relatedDataPosts,
        username : 'Md. Mehedi Hasan Khan'
    });
});

module.exports = router;