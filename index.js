"use strict";

var Cylon = require("cylon");

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

      connections: {
       keyboard: { adaptor: "keyboard" }
      },

      devices: {
        keyboard: { driver: "keyboard" }
      },

      work: function(my) {
        my.keyboard.on("a", function() {
          console.log("a pressed!");
        });
      }
    });
  }

  if(type == "dummy") {
    Cylon.robot({
      name: name,

      sayRelax: function() {
          return this.name + " says relax";
      },

      work: function(my) {},

      commands: function() {
        return {
          say_relax: this.sayRelax
        };
      }

    });
  }

});

Cylon.start();
