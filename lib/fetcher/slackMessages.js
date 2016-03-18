"use strict"

var log     = require('winston'),
    async   = require('async'),
    db      = require('../db'),
    broker  = require('../broker'),
    Slack   = require('slack-node'),
    conf    = require('../../conf/config');

var slack = new Slack("xoxp-15596403954-23521805926-27813899361-6d37c0df87");

exports.do = function(callback){

  slack.api('channels.history', {
    channel:'C0FHHFU14'
  }, function(err, response){

    if( err )
      log.error(err);

    async.each(response.messages, function(msg, next){
      // poke messages
      if( msg.text.match(/^\:poke(?:\s+)?<@(.*?)>/) )
        broker.send('poke', RegExp.$1);
      next();
    }, function(err){
        return callback();
    });
  });
}
