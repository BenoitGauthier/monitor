/*
 *	app.js
 *
 *	Main client application
 *
 *	@copyright Benoit Gauthier <bgauthier075@gmail.com>
 *
 */

// Load framework
var fw = require('./framework.js');

fw.logger.trace('Start of client application');

// Load collectors, list all files in the collectors folder
var aFiles = fw.fs.readdirSync(__dirname + '/collectors/');
var aCollectors = [];

for (var i = 0; i < aFiles.length; i++) {	
	// Create instance of collector and call init function 
	fw.logger.trace('Loading collector ' + aFiles[i]);
	var instance = require(__dirname + '/collectors/' + aFiles[i]);
	instance.init();
	aCollectors[aCollectors.length] = instance;

}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// Start main collect loop
setInterval(function() {

	// For each collector call runCollector
	for (var i = 0; i < aCollectors.length; i++) {
		fw.logger.trace('Executing collector ' + aFiles[i]);
		runCollector(aCollectors[i]);
	}
	fw.logger.trace('Collect completed');

}, fw.config.collectInterval);

// F U N C T I O N S

/**
 * This function will call collect on collector object
 */
function runCollector(collector) {
	collector.collect();
}

/**
 * This function will call close on all collectors
 */
function gracefulExit() {
	fw.logger.trace('Application is closing');
	for (var i = 0; i < aCollectors.length; i++) {
		fw.logger.trace('Closing collector ' + aFiles[i]);
		aCollectors[i].close();
	}
	fw.logger.trace('Collectors are now closed');
	process.exit(1);
}
