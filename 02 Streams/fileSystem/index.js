//Read and write files with pipe

const fs = require('fs');
const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method == 'GET') {
        
        let path = request.url;
        if(path == '/'){
            path = '/index.html';
        }

        if (path == '/index.html') {
            // //fileStream
            // const fileStream = fs.createReadStream('./static/index.html');

            // response.writeHead(200, {
            //     'Content-Type': 'text/html'
            // });

            // fileStream.on('data', chunk => response.write(chunk));
            // fileStream.on('end', () => response.end());

            
            // read stream and pipe
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });

            fs.createReadStream('./static/index.html').pipe(response);
        } else {
            response.writeHead('404');
            response.write('404 Not found');
            response.end();
        }

        //// Pipe and callback
        // fs.stat(`./static${path}`, (error, staticFile) => {
        //     if(error != null || staticFile.isFile() == false){
        //         response.writeHead('404');
        //         response.write('404 Not found');
        //         response.end();
        //     }else{
        //         fs.createReadStream(`./static${path}`).pipe(response);
        //     }
        // })
    }
})

server.listen(3000);
