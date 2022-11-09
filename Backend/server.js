var http = require('http');
var app = require('./app');
// .env file can be used for this in production
const PORT = 7000

var server = http.createServer(app);

server.listen(PORT, console.log("server started at port " + PORT))

