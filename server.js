var http = require('http');

var fs = require('fs');
var port = 8080;

// Loading the index file . html displayed to the client

var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
console.log('Started Server listening '+ port);

// Loading socket.io

var io = require('socket.io')(server);

//Load Cylon
var Cylon = require("cylon");
Cylon.api('socketio',
{
  host: '0.0.0.0',
  port: '3000'
});



// When a client connects, we note it in the console

io.sockets.on('connection', function (client) {

    console.log('A device has connected!');

    client.on('message',function(message){

    	console.log('Received ' + message);
    	var msgarray = message.split(" ");
    	/*switch(){

    	}*/
    });

    client.on('new device', function(msg) {
    	if(msg.type == "keyboard") {
    	  Cylon.robot({
    	    name: msg.name,

    	    events: ['button_clicked'],

    	    connections: {
    	     keyboard: { adaptor: "keyboard" }
    	    },

    	    devices: {
    	      keyboard: { driver: "keyboard" }
    	    },

    	    commands: {},

    	    work: function(my) {
    	      my.keyboard.on("a", function() {
    	        my.buttonClick("a");
    	        console.log("a pressed!");
    	      });
    	      my.keyboard.on("b", function() {
    	        my.buttonClick("b");
    	        console.log("b pressed!");
    	      });
    	    },

    	    buttonClick: function(button) {
    	      this.emit('button_clicked',button);
    	    }
    	  }).start();
    	}

    	if(msg.type == "dummy") {
    	  Cylon.robot({
    	    name: msg.name,

    	    events: ['blink'],


    	    toggle: function() {
    	        console.log(this.name + ' just blinked!');
    	        this.emit('blink')
    	    },

    	    work: function(my) {},

    	    commands: function() {
    	      return {
    	        toggle: this.toggle
    	      };
    	    }

    	  }).start();
    	}	
    });

});


//message should be of type <command options> so we can split and use first msg[0] as state


server.listen(port);
