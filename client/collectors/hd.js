/*
 *	hd collector
 *	This collector will read the hard drive information of the server	
 * 
 */

// Load framework
var fw = require('../framework.js');

var aData = [];

function collect() {

}

function init() {
	fw.logger.trace("hd collector init");
}

function close() {
	fw.logger.trace("hd collector closed");
}


exports.collect = collect;
exports.init = init;
exports.close = close;