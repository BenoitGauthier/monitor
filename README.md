monitor
=======

Server monitoring using node.js and mongodb

Client
======
Client will run as a daemon, will init all data collectors. Call data collectors 
at a configured interval and push information to server via http post.

To start or stop the client :

    ./monitor-client.js start | stop

Server
======
Server will listen for pushed from the client and log received information in the 
mongodb database.

To start or stop the server :

    ./monitor-server.js start | stop

Collectors
==========
Collectors will get information from the system, stock or buffer the information 
in an array, and push the information to the server.

Collectors must export the following functions : 
	
	init()			will be called when object is initialy created
	collect()		will be called at every interval, collection of data
					must be done here.

Configuration
=============
Client configurations are found in ./client/config.js

	collectInterval			Interval in milliseconds between each collect call
	serverHost				Server host name
	serverPort				Server port number

Server configuration are found in ./server/config.js					

	serverPort				Server port number


Required node modules
=====================
Here is a list of required node js modules:

fs
log4js
http
daemonize2
mongojs
 