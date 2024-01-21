const http = require('http');
const { handleRequest } = require('./main');

const imageServer = http.createServer(handleRequest);

imageServer.listen(3000);
