
const io = require('socket.io-client');
var socket = io.connect('http://localhost:8080');

socket.emit('message', 'You are connected!');
socket.emit('new device',{type: "dummy", name: "Bot1"});
socket.emit('new device',{type: "keyboard", name: "Bot2"});


function cylonConn() {
	var cylon = io.connect('http://localhost:3000/api');
	var robot = [], device;
	cylon.on('robots', function(robots) {
		console.log('List of robots:', robots);
		console.log('_______________________');
		robots.forEach(function(element,i) {
	         // Once we have a list of available robots we can use
	         // any of them and connect to their socket.
	         robot[i] = new Object;
	         robot[i].name = element
	         robot[i].socket = io('http://127.0.0.1:3000/api/robots/' + element);

	         // Listen to the 'commands' event on device
	         // returns a list of available commands for the device
	         robot[i].socket.on('commands', function(commands) {
	           robot[i].commands = commands;
	         });
	         // Every time a event is executed the 'event' event
	         // is triggered, returns the name of the event executed
	         // and the value returned
	         robot[i].socket.on('event', function(payload) {
	           console.log('Robot command name ==>', payload.name);
	           console.log('Robot command data ==>', payload.data);
	         });
	         // Listen to the 'events' event on device
	         // returns a list of available events for the device
	         robot[i].socket.on('events', function(events) {
	          robot[i].events = events;
	         });

	         // We emit 'commands' and 'events' so we can listen
	         // and get the lists of available items
	         robot[i].socket.emit('commands');
	         robot[i].socket.emit('events');

	    });
	    
	});
	cylon.emit('robots');
};


setTimeout(cylonConn, 1000);

/*var Cylon = require("cylon");


var device;
 device = io('http://127.0.0.1:3000/api/robots/rosie/devices/led');
 device.emit(''); */
