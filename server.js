const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get('/',function(req,res){
    res.send('hello world');
});

io.on('connection', function(socket) {
    socket.emit('welcome', 'Hello there!')

    socket.on('msg', (data) => { console.log(data) })
})

server.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
