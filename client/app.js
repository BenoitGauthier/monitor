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

// Load collectors
var aFiles = fw.fs.readdirSync(__dirname + '/collectors/');
var aCollectors = [];

for (var i = 0; i < aFiles.length; i++) {

	 var instance = require(__dirname + '/collectors/' + aFiles[i]);
     instance.init();
     aCollectors[aCollectors.length] = instance;

}

fw.logger.trace('Loaded collectors : ');
fw.logger.trace(aCollectors);

// Start main collect loop
setInterval(function() {
	
	for (var i = 0; i < aCollectors.length; i++) {
		runCollector(aCollectors[i]);
	}

}, fw.config.collectInterval);

// F U N C T I O N S

function runCollector(element) {
	element.collect();
}
