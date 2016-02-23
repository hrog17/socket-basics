var express = require('express');
var PORT = process.env.PORT || 3001;

var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
    console.log('User connected via socket.io!');

    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];

        if (typeof userData !== "undefined") {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    // event to join room
    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: now.valueOf()
        });
    });

    socket.on('message', function(message) {
        console.log('Message received: ' + message.text);
        message.timestamp = now.valueOf();
        io.to(clientInfo[socket.id].room).emit('message',
            message);
    });
    // 1st argument - is any event string name
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application',
        timestamp: now.valueOf()
    });
});

http.listen(PORT, function() {
    console.log('Server started');
});
