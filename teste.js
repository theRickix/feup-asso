

const io = require('socket.io-client');
var socket1 = io.connect('http://localhost:3000/api');
socket1.on('robots', function(data){
	console.log(data);
});

socket1.emit('robots');
