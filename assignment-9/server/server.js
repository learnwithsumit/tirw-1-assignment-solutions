const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

global.io = io;

const router = jsonServer.router("db.json");

// response middleware
router.render = (req, res) => {
  const path = req.path;
  const method = req.method;

  if (path.includes("/conversations")) {
    if (method === "PATCH") {
      // emit socket event
      io.emit("conversationEdited", {
        data: res.locals.data,
      });
    } else if (method === "POST") {
      io.emit("conversationAdded", {
        data: res.locals.data,
      });
    }
  }
  if (path.includes("/messages")) {
    console.log(" message came here");
    if (method === "POST") {
      console.log("message is posting");
      io.emit("messageAdded", {
        data: res.locals.data,
      });
    }
  }

  res.json(res.locals.data);
};

const middlewares = jsonServer.defaults({ noCors: true });
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;

app.use(middlewares);

const rules = auth.rewriter({
  users: 640,
  conversations: 660,
  messages: 660,
});

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port);
