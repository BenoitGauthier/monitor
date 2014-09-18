#!/usr/bin/env node
/*
 *	Monitor server
 *
 *	@copyright Benoit Gauthier <bgauthier075@gmail.com>
 */
var daemon = require("daemonize2").setup({
    main: "app.js",
    name: "monitor-server",
    pidfile: "monitor-server.pid"
});

switch (process.argv[2]) {

    case "start":
        daemon.start();
        break;

    case "stop":
        daemon.stop();
        break;
        
    case "restart":
    	daemon.stop();
        daemon.start();
        break;

    default:
        console.log("Usage: [start|stop]");
}
