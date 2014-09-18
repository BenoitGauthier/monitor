//
//	Memory collector
//

// Load framework
var fw = require('../framework.js');

var aData = [];

function collect() {

	var now = new Date();

	fw.fs.readFile('/proc/meminfo', 'utf8', function(err, data) {

		if (err) {
			return console.log(err);
		}

		var aMemInfo = []; 			
			
		var aLines = data.split('\n');
		for (var i = 0; i < aLines.length; i++) {
			
			var aTokens = aLines[i].split(':');			
			if (aTokens.length == 2) {
				var key = aTokens[0].replace(/^\s+|\s+$/g, '');
				key = key.toLowerCase();
				var sValue = aTokens[1].replace(/^\s+|\s+$/g, '');
				
				var sSize = '';
				var sFormat = '';
				var aValues = sValue.split(' ');
				if (aValues.length >= 1) {
					sSize = aValues[0];
				}
				if (aValues.length >= 2) {
					sFormat = aValues[1];
				}
				
				//fw.logger.trace('Key is = ' + key);
				//fw.logger.trace('Value is = ' + value);
				aMemInfo[aMemInfo.length] = {memorytype: key, value: sSize, format: sFormat};
							
				
			}
		}
		
		//console.log(aMemInfo);

		
		aData[aData.length] = {
			type : 'meminfo',
			timestamp : now.toJSON(),
			data : aMemInfo
		};
		
	});

	if (aData.length >= 5) {
		fw.logger.trace('before post to server');
		fw.postToServer(aData);		
		//fw.logger.debug(aData);
		aData = [];
	}

}

function init() {
	fw.logger.trace("Memory collector init");
}

exports.collect = collect;
exports.init = init;
