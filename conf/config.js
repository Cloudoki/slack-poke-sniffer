"use strict"
var log = require('winston');

var environment = "dev";

if( process.env.NODE_ENV )
	environment = process.env.NODE_ENV;
if( process.argv.length )
	for (var i = 0; i < process.argv.length; i++) {
		if( process.argv[i] == "-E" && process.argv[i+1] ){
			environment = process.argv[i+1];
			process.env.NODE_ENV = process.argv[i+1];
			break;
		}
	};
process.env.NODE_ENV = environment;
if( environment != "prod" && environment != "dev" && environment != "staging" ){
  log.error("Invalid configuration '"+environment+"', only 'dev', 'staging' and 'prod' are available.");
  process.exit(-1);
}

log.info("## Cloudoki Slack Poke Sniffer ## starting with", environment.toUpperCase(), "configuration.");

module.exports = require("./"+environment.toLowerCase());
