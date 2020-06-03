const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
let url = require('url');
// const query = require("querystring");
// const url = require("url");

// renvoie le port heroku
let port = process.env.PORT;

// si on est en local/pas de port heroku,
// utiliser le port 3000
if (port == null || port == "") {
    port = 3000;
}

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})
.get("/styles.min.css", function(req, res) {
    res.sendFile(__dirname + "/styles.min.css");
})
.get("/styles.min.css.map", function(req, res) {
    res.sendFile(__dirname + "/styles.min.css.map");
})
.get("/fonts/Minipax-Regular.ttf", function(req, res) {
    res.sendFile(__dirname + "/fonts/Minipax-Regular.ttf");
})
.get("/client.js", function(req, res) {
    res.sendFile(__dirname + "/client.js");
})
.get("/chat", function(req, res) {
    res.sendFile(__dirname + "/chat.html");
})
.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404);
    res.send("ouloulou");

})


io.on("connection", function(socket) {
    //console.log(socket);
    console.log("cc ?");

    socket.on("new", function(data) {
        console.log("cc toi");
        io.emit("new", data);
    });


    socket.on("chat message", function(msg) {
        console.log(msg);

        io.emit("chat message", msg);
    });

    socket.on("disconnect", function(data) {
        console.log("qn est parti en catimini...");
        // ! AJOUTER CONDITION 
        // (si url = /chat)
        // io.emit("disconnect", data);
    });
});

server.listen(port);