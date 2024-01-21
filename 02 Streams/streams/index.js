const http = require('http');

const server = http.createServer((request, response) => {
    if(request.method == 'GET'){
        response.write('OK');
        response.end();
    }else if(request.method == 'POST'){
        const body = [];

        request.on('data', chunk => {
            body.push(chunk);
        });
        request.on('end', () => {
            const result = JSON.parse(body.join(''));
            console.log(result);

            result.count++;

            response.write(JSON.stringify(result));
            response.end();
        })
    }
});

server.listen(3000);
