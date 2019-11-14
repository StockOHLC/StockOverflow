const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);

// const http = require("http").createServer(app);
// const io = require("socket.io")(http); //http is the server- do we do .createServer(http)?

//SOCKETS
// io.on("connection", socket => {
//   console.log("made some connections");
//   socket.emit("message", "fuck");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

const http = require('http').createServer(app);
const io = require('socket.io')(http); //http is the server- do we do .createServer(http)?

//SOCKETS
io.on('connection', (socket) => {
  console.log('made some connections')
  socket.emit('message', 'fuck');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const stocksRouter = require("./routes/stocksRouter");
const usersRouter = require("./routes/userRouter");
const pastStockRouter = require("./routes/pastStocksRouter");
const messageRouter = require("./routes/messageRouter");
const newsRouter = require("./routes/newsRouter");

//WEBPACK BUILD
app.use("/build", express.static(path.join(__dirname, "../build")));

// ROUTE HANDLING
app.use("/user", usersRouter);
app.use("/stocks", stocksRouter);
app.use("/pastStock", pastStockRouter);
app.use("/messages", messageRouter);
app.use("/news", newsRouter);
// app.use('/api', apiRouter);

//MAIN PAGE
app.use("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// Chat socket io
io.on("connection", socket => {
  console.log("New User Connected");

  socket.on("chat message", message => {
    console.log("message: ", message);

    io.emit("chat message", message);
  });

  // Save messages stretch feature
  // Emit messages to frontend stretch feature

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//CATCH-ALL HANDLER
app.use("*", (req, res, err) => {
  res.sendStatus(404);
});

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  return res.status(400).json("Global Error");
});

//SERVER
// http.listen(PORT, () => { //dont want to use http on the client side
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = app;
