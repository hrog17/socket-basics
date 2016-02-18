var express = require('express');
var PORT = process.env.PORT || 3001;

var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('User connected via socket.io!');

    socket.on('message', function(message) {
        console.log('Message received: ' + message.text);

        io.emit('message', message);
    });
    // 1st argument - is any event string name
    socket.emit('message', {
        text: 'Welcome to the chat application'
    });
});

http.listen(PORT, function() {
    console.log('Server started');
});
