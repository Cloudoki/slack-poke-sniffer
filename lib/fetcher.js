"use strict";

var async     = require('async'),
    conf      = require('../conf/config'),
    log       = require('winston'),
    arduino   = require('./arduino'),
    fetchers  = {
    	slack_msg :require('./fetcher/slackMessages'),
    };

var _w = null;

var schedule = function(func,timeout){

    _w = setTimeout(func||fetch, (timeout||conf.fetcher.interval)*1000); return _w;
};

var fetch = function(){

    // for each defined fetcher
    async.mapSeries(fetchers,

        // execute it
        function(fetcher,next){
            fetcher.do(function(err, resusult){
                return next();
            });
        },
    function(err,ok){

        if( err )
            log.error("Error fetching:", err);

        log.info("End turn.");
        // schedule next run
        schedule();
    });
}

exports.start = function(){

	if( _w == null ){
    fetch();
    return true;
  }
  else
      log.info("Already running");

	return _w != null;
}

exports.stop = function(){

	if( _w != null ){
		clearTimeout(_w);
		_w = null;
	} else {
        log.info("Already stopped");
    }

	return _w == null;
}

exports.isRunning = function(){

	return _w != null;
}
