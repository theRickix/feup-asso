var http = require('http');

var fs = require('fs');
var port = 8080;

// Loading the index file . html displayed to the client

var server = http.createServer();
console.log('Started Server listening '+ port);

// Loading socket.io

var io = require('socket.io')(server);

//Load Cylon
var Cylon = require("cylon");


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

    	    sayRelax: function() {
    	        console.log(this.name + " says relax");
    	        return this.name + " says relax";
    	    },

    	    work: function(my) {},

    	    commands: function() {
    	      return {
    	        say_relax: this.sayRelax
    	      };
    	    }

    	  }).start();
    	}
    });

});


//message should be of type <command options> so we can split and use first msg[0] as state




server.listen(port);
