const express = require("express");
const store = require("../rtk/app/store");
const { fetchPost } = require("../rtk/features/post/postSlice");
const router = express.Router();
// Just simple info for root api endpoint
router.get("/", (_, res)  => {
    // console.log("Redux Store: ", store.getState());
    store.dispatch(fetchPost());
    const {singlePost, relatedPosts} = store.getState();
    const {singleDataPost} = singlePost;
    const {relatedDataPosts} = relatedPosts;
    res.render('index', {
        data : {
        singleDataPost:{
            ...singleDataPost,
            imgUrl: "https://picsum.photos/200/300",
            imageTitle: "Single Post Title",
        },
        relatedDataPosts,
        username : 'Md. Mehedi Hasan Khan'
    }});
});

module.exports = router;