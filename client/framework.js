/*
 *	framework.js
 *	
 *	requires that are use by all js files, loaded at begining of app.js
 *
 *	@copyright Benoit Gauthier <bgauthier075@gmail.com>
 *
 */

// Load configuration 
var config = require('./config.js');

// Get current host name
if (config.hostName == '') {
	var os = require("os");
	var sHostName = os.hostname();
	config.hostName = sHostName;
}

// Load file system
var fs = require('fs');

// Initilize log4js
var log4js = require('log4js');
var http = require('http');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('/var/log/monitor-client.log'),
		'monitor-client');
log4js.addAppender(log4js.appenders.file('/var/log/monitor-server.log'),
		'monitor-server');

var logger = log4js.getLogger('monitor-client');
logger.setLevel(config.logLevel);

var loggerServer = log4js.getLogger('monitor-server');
loggerServer.setLevel(config.logLevel);

/**
 * This function will post data to the server in order for it to write
 * this data to the mongodb database
 * 
 * @param data
 */
function postToServer(data) {

	logger.trace('Initial data = ');
	logger.trace(data);
		
	var sData = JSON.stringify(data);
	
	logger.trace('JSON data = ');
	logger.trace(sData);
	
	
	var options = {
		host : config.serverHost,
		path : '/',
		port : config.serverPort,
		method : 'POST'
	};

	var req = http.request(options, function(response) {
		var str = '';
		response.on('data', function(chunk) {
			str += chunk;
		});

		response.on('end', function() {
			if (str != 'OK') {
				fw.logger.error('Did not get OK from server');
			}			
		});

	});
	
	req.write(sData);
	req.end();

}



// Exports objects and functions
exports.config = config;
exports.fs = fs;
exports.http = http;
exports.postToServer = postToServer;
exports.log4js = log4js;
exports.logger = logger;
exports.loggerServer = loggerServer;