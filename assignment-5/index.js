const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
global.appRoot = path.resolve(__dirname);
const store = require("./rtk/app/store");
const { fetchPost } = require("./rtk/features/post/postSlice");
const rootPath = require('./controller/root');
const resultJsonData = require('./controller/post');
// Middleware

app.set('view engine','ejs');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: true}));

app.use(rootPath);
app.use(resultJsonData);
// subscribe to state changes
store.subscribe(() => {
    // console.log(store.getState());
});

// dispatch actions
store.dispatch(fetchPost());

app.listen(process.env.PORT || 4000, () => {
    console.log("Node server started at http://localhost:" + (process.env.PORT || 4000));
});