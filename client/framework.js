/*
 *	framework.js
 *	
 *	requires that are use by all js files, loaded at begining of app.js
 *
 *	@copyright Benoit Gauthier <bgauthier075@gmail.com>
 *
 */
var config = require('./config.js');
var fs = require('fs');
var log4js = require('log4js');
var http = require('http');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('/var/log/monitor-client.log'),
		'monitor-client');

var logger = log4js.getLogger('monitor-client');
logger.setLevel('TRACE');

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
			console.log('Monitor server response = ' + str);
		});

	});
	
	req.write(sData);
	req.end();

}

exports.config = config;
exports.fs = fs;
exports.http = http;
exports.postToServer = postToServer;
exports.log4js = log4js;
exports.logger = logger;
