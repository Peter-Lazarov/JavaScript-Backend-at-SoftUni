//This way the server loads the entire file into the RAM

const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    fs.readFile('./bigFile.txt', (error, file) => {
        response.write(file);
        response.end();
    });
});

server.listen(3000);
