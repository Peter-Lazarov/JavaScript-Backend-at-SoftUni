const fs = require('fs');
const fsAsync = require('fs').promises;
const { setBreeds } = require('./breed');
//const cats = require('../data/cats');

async function catAdd(request, response) {
    if (request.method == 'GET') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const layout = await fsAsync.readFile('./views/addCat.html');
        response.write(layout.toString().replace('<%%Breeds%%>', await setBreeds()));

        response.end();
    } else if (request.method == 'POST') {
        let data = [];

        request.on('data', chunk => data.push(chunk));
        request.on('end', async () => {
            processData(data);
            // response.writeHead(301, {
            //     'Location': '/'
            // });
            response.end();
        });
    }
}

// -----------------------------32855458316949215553425560934
// Content-Disposition: form-data; name="name"

// Sharencho
// -----------------------------32855458316949215553425560934
// Content-Disposition: form-data; name="description"

// Good cat
// -----------------------------32855458316949215553425560934
// Content-Disposition: form-data; name="upload"; filename="Energy reasons.jpg"
// Content-Type: image/jpeg

// ����


// "",
// "\r\nContent-Disposition: form-data; name=\"name\"\r\n\r\nSharencho\r\n",
// "\r\nContent-Disposition: form-data; name=\"description\"\r\n\r\nGood cat\r\n\r\n",

//\r\nContent-Disposition: form-data; name="upload"; filename="Energy reasons.jpg"\r\nContent-Type: image/jpeg\r\n\r\n����JFIF��C\n\n\n\t\t\n%# , #&')*)-0-(0%()(��C\n\n\n\n(((((((((((((((((((((((((((((((((((((((((((((((((((��� "�������z:�!HGĄq!HGĄq!HGĄq!HGĄq!HGĄq!HGĄq�ަq!HGĄq!HGĄq!HGĄq!HGĄq!HGĄq!HGĄp@ O�<…�MQO���Ռ��8���c�Ĭ��s}���V�X�[���t�!�쌵Q�� �U\t���0�!yMh/��Aq����z޾��xTV��X1�&+"��h�Ie��\\��Y�;_����_�����C*eB�45~�#�,Sdύ�A�y���1�K��`��J]~���YDK��"��\r`��h������pa����Z��zǦ����_��.��4���`WX[ )u~��{Έ4���nm�<�)Fޙd:2�H+Q�І2��[xJ�U���ԉk�p�J]kv�W�C\\&_e�/�+�DUR�*���a�j����P�s�&�ye!Ȋg�>��;�/�!�F(��HL���-��Wx�$���8&�b�x�蹥݃r�5/>�B����[9�R�aY��Mx�V��ܨע��h�6�N��e��R\rU��K~Iu�YkZ6�]pg;����w�_LE"Ql:�� ����:v���Gf�&�6>��\r���9c/0Z\n�(?�;�/���\r...

async function processData(data) {
    const bodyBuffer = Buffer.concat(data);
    let dataString = bodyBuffer.toString('ascii');

    let indexOfFirstLine = dataString.indexOf('\r\n');
    let delimiter = dataString.substring(0, indexOfFirstLine);

    let dataReceivedArray = dataString.split(delimiter);

    let name = dataReceivedArray[1].replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");
    let description = dataReceivedArray[2].replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");
    let breed = dataReceivedArray[4].replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");

    let forthLine = dataString.indexOf(delimiter, 10);
    forthLine = dataString.indexOf(delimiter, forthLine + 1);
    forthLine = dataString.indexOf("\r\n\r\n", forthLine + 1);
    let imageClose = dataString.indexOf(delimiter, forthLine + 1) - 2;

    let image = dataReceivedArray[3];
    let imageName = image.replace(new RegExp("\\r\\n.*filename=\""), "")
    imageName = imageName.substring(0, imageName.indexOf("\"\r\n"));

    let imageOnly = Buffer.alloc(imageClose - forthLine + 4);

    bodyBuffer.copy(imageOnly, 0, forthLine + 4, imageClose);
    let catsAllArray = [];

    catsAllArray = await readJSONFile(`./data/cats.json`);

    const id = catsAllArray.length + 1;
    const imagePath = `/content/images/${imageName}`;

    let cat = {
        id,
        name,
        description,
        imagePath,
        breed,
    }

    catsAllArray.push(cat);

    await fsAsync.writeFile(`./data/cats.json`, JSON.stringify(catsAllArray, null, 2));

    await fsAsync.writeFile(`./content/images/${imageName}`, imageOnly);
}

async function readJSONFile(filePath){
    try {
        const catsAllString = (await fsAsync.readFile(filePath)).toString();
        return JSON.parse(catsAllString);
    } catch (error) {

    }
}

module.exports = {
    catAdd,
    readJSONFile
}
