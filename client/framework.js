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

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('/var/log/monitor-client.log'), 'monitor-client');

var logger = log4js.getLogger('monitor-client');
logger.setLevel('TRACE');

exports.config = config;
exports.fs = fs;
exports.log4js = log4js;
exports.logger = logger;
