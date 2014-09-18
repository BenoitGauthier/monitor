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

// Load collectors
var aFiles = fw.fs.readdirSync(__dirname + '/collectors/');
var aCollectors = [];

for (var i = 0; i < aFiles.length; i++) {	
	fw.logger.trace('Loading collector ' + aFiles[i]);
	var instance = require(__dirname + '/collectors/' + aFiles[i]);
	instance.init();
	aCollectors[aCollectors.length] = instance;

}

// Start main collect loop
setInterval(function() {

	for (var i = 0; i < aCollectors.length; i++) {
		fw.logger.trace('Executing collector ' + aFiles[i]);
		runCollector(aCollectors[i]);
	}
	fw.logger.trace('Collect completed');

}, fw.config.collectInterval);

// F U N C T I O N S

function runCollector(element) {
	element.collect();
}
