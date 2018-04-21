



//Connection configuration will use Event handling result, needs to be taken from here so it is a module export to use on handling loop
"use strict";

var Cylon = require("cylon");
var EventSource = require('eventsource');
var request     = require('request');

var es  = new EventSource('http://127.0.0.1:3000/api/robots/Bot1/events/button_clicked');

es.onmessage = function(e) {
  console.log(e.data);
};

// ensure you install the API plugin first:
// $ npm install cylon-api-http
Cylon.api("http", {
  ssl: false
});

var bots = {
  Bot1: "keyboard",
  Bot2: "dummy"
};

Object.keys(bots).forEach(function(name) {
  var type = bots[name];
  if(type == "keyboard") {
    Cylon.robot({
      name: name,

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
          console.log(" bpressed!");
        });
      },

      buttonClick: function(button) {
        this.emit('button_clicked',button);
      }
    }).start();
  }

  if(type == "dummy") {
    Cylon.robot({
      name: name,

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

//Cylon.start();

