const store = require("./app/store");
const { fetchPost } = require("./features/post/postSlice");

// initial state
// console.log(`Initial State: ${JSON.stringify(store.getState())}`);

// subscribe to state changes
store.subscribe(() => {
    // console.log(store.getState());
});

// dispatch actions
store.dispatch(fetchPost());
