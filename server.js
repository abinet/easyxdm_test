var connect = require('connect');
connect.createServer(
	connect.static("./htpdir")
).listen(8080);
