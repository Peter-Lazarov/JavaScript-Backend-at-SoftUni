const fs = require('fs');
const asyncFs = require('fs').promises;

async function homePage(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    const layout = await asyncFs.readFile('./static/index.html');
    response.write(layout.toString().replace('<%%image1%%>', await getImageList()));
    response.end();
}

function sendFile(request, response) {
    if (request.url == '/style.css') {
        response.writeHead(200, {
            'Content-Type': 'text/css'
        });
        fs.createReadStream('./static/style.css').pipe(response);
    } else {
        const filename = '.' + request.url;
        fs.createReadStream(filename).pipe(response);
    }
}

//'<img src="./img/house.png" alt="house">'

async function getImageList() {
    const files = await asyncFs.readdir('./img');
    let imagesString = '<ul>';
    for (let file of files) {
        imagesString += `<li><img src="./img/${file}"></li>`;
    }
    imagesString += '</ul>'
    return imagesString;
}

module.exports = {
    homePage,
    sendFile
};
