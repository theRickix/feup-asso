var http = require('http');

var fs = require('fs');
var port = 8080;

// Loading the index file . html displayed to the client

var server = http.createServer();
console.log('Started Server listening '+ port);

// Loading socket.io

var io = require('socket.io')(server);


// When a client connects, we note it in the console

io.sockets.on('connection', function (socket) {

    console.log('A device has connected!');

});



io.sockets.on('message',function(message){

	console.log('Received ' + message);
});



server.listen(port);