const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.get("/", (req, res) => {
    res.send("Welcome to Socket.IO App!");
});

const server = app.listen(port, () => {
    console.log("Server started on: " + port);
});

// Attach socket to the server
const io = require("socket.io").listen(server);
require("./socket")(io);
