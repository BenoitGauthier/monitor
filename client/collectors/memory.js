//
//	Memory collector
//

// Load framework
var fw = require('../framework.js');

var aData = [];

function collect() {

	var now = new Date();

        fw.fs.readFile('/proc/meminfo', 'utf8', function (err,data) {
                if (err) {
                        return console.log(err);
                }
                var sMemFree = "";
                var aLines = data.split('\n');
                for(var i = 0; i < aLines.length; i++) {
                        var aTokens = aLines[i].split(':');
                        if (aTokens[0] == "MemFree") {
                                sMemFree = aTokens[1].replace(/^\s+|\s+$/g,'');
                                break;
                        }
                }

                aData[aData.length] = {type:'meminfo', timestamp: now.toJSON() ,MemFree: sMemFree};
        });

        if (aData.length >= 10) {
                fw.logger.debug(aData);
                aData = [];
        }


}

function init() {
	fw.logger.trace("Memory collector init");
}

exports.collect = collect;
exports.init = init;
