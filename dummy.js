
const io = require('socket.io-client');
var socket = io.connect('http://localhost:8080');

socket.emit('message', 'You are connected!');
socket.emit('new device',{type: "dummy", name: "Bot1"});
socket.emit('new device',{type: "keyboard", name: "Bot2"});

/*var Cylon = require("cylon");


var device;
 device = io('http://127.0.0.1:3000/api/robots/rosie/devices/led');
 device.emit(''); */
