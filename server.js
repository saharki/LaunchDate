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
    res.redirect('http://localhost:3000/');
});

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    socket.on('disconnect', function(){
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on('msg', (data) => {
        console.log(data);
        io.emit('msg', data);
    });
});

server.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
