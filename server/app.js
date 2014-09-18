/*
 *	app.js
 *
 *	Main server application
 *
 *	@copyright Benoit Gauthier <bgauthier075@gmail.com>
 *
 */

// Load framework
var fw = require('../client/framework.js');

fw.http.createServer(function(req, res) {
	fw.logger.trace('Start of server callback');
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});

	var body = "";
	req.on('data', function(chunk) {
		body += chunk;
		// fw.logger.trace('Got data chunk = ' + chunk);
	});
	
	req.on('end', function() {
		fw.logger.trace('End of server request');
		
		var oData = JSON.parse(body);
	
		// Save data to mongodb		
		var mongojs = require('mongojs');		
		var db = mongojs('localhost/monitor');
			
		// save documents
		for (var i = 0; i < oData.length; i++) {
			console.log('Collection type = ' + oData[i].type);
			var oCol = db.collection(oData[i].type);
			oCol.insert(oData[i]);			
		}
		
		db.close();
				
		res.writeHead(200);
		res.end('OK');
		
	});

}).listen(fw.config.serverPort, '127.0.0.1');