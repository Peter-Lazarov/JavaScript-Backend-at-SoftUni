const { createImage } = require("./createController");
const { homePage, sendFile } = require("./homeController");

function handleRequest(request, response) {
    let handler;

    if (request.method == 'GET') {
        if(request.url.startsWith('/img')){
            //image
            handler = sendFile;
        }else if (request.url == '/') {
            handler = homePage;
        }else if (request.url == '/style.css') {
            //css
            handler = sendFile;
        }
    } else if (request.method == 'POST') {
        createImage(request, response);
    }

    if(typeof handler == 'function'){
        handler(request, response);
    } else {
        response.writeHead(404);
        response.write('404 Not Found');
        response.end();
    }
}

module.exports = {
    handleRequest
};
