"use strict"

var log          = require('winston'),
    EventEmitter = require('events').EventEmitter,
    inherits     = require('util').inherits;

function Broker() {
  var self = this;
  EventEmitter.call(self);
}

inherits(Broker, EventEmitter);

Broker.prototype.send = function(event, data){
  var self = this;

  if( !event )
    event = "updates";
  if( !data )
    return;

  setImmediate(function() {
      self.emit(event, data);
  });
}

module.exports = new Broker();
