"use strict"

var log     = require('winston'),
    levelup = require('levelup'),
    db 		  = levelup('./db', { valueEncoding:'json' });

exports.save = function(data, callback){

	var key 	= data.coordinates.lat+"_"+data.coordinates.lng;
		value 	= data;

	db.put( key, value, function(err){
		if( err )
			console.log("Error saving to db:", err);
		return callback(err);
	});
}

exports.list = function(callback){

	var _data = [],
		_error;

	db.createReadStream({ keys: false, values: true })
	.on('data', function (data) {
	    _data.push(data);
	})
	.on('error', function(err){
		_error = err;
		console.log("Error getting level data:", err);
	})
	.on('end', function(){
		return callback(_error, _data);
	});
}

exports.get = function(key, callback){

  db.get(key, function(err, value){

     if( err )
      log.error(err);

    return callback(err, value);
  });
}
