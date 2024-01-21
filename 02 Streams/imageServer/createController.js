const fsAsync = require('fs').promises;

function createImage(request, response) {
    const data = [];

    request.on('data', chunk => data.push(chunk));
    request.on('end', async () => {

        //With many test and adjustment I've achive almost exact copy/upload of image from source folder to 
        //destination folder. Difference was 4 bytes because of non constant length of buffer.
        //For picture that I use Energy reasons.jpg the encoding needed was ANSI and I use ascii in converting to string.

        //-----------------------------396549635916153438434284749176\r\n
        //Content-Disposition: form-data; name=\"img\"; filename=\"Energy reasons.jpg\"\r\n
        //Content-Type: image/jpeg\r\n
        //\r\n

        //const body = data.join('');
        const bodyBuffer = Buffer.concat(data);
        let body = bodyBuffer.toString('ascii');
        // let body1 = bodyBuffer.toString('base64');
        // let body2 = bodyBuffer.toString('utf8');
        // let body3 = bodyBuffer.toString('utf-8');
        // let body4 = bodyBuffer.toString('ascii');

        // let length0 = bodyBuffer.length;
        // let length1 = body1.length;
        // let length2 = body2.length;
        // let length3 = body3.length;
        // let length4 = body4.length;
        
        let indexOfFirstLine = body.indexOf('\r\n');
        let firstLine = body.substring(0, indexOfFirstLine);
        let indexOfForthLine = body.indexOf('\r\n', indexOfFirstLine + 2);
        indexOfForthLine = body.indexOf('\r\n', indexOfForthLine + 2);
        indexOfForthLine = body.indexOf('\r\n', indexOfForthLine + 2);
        let indexOfEndOfImage = body.lastIndexOf(firstLine) - 2;
        let indexOfFileName = body.indexOf('filename=');
        let indexOfFileNameClose = body.indexOf('\"', indexOfFileName + 11);
        let filename = body.substring(indexOfFileName + 10, indexOfFileNameClose);

        //let imageLength = indexOfEndOfImage - indexOfForthLine + 2;
        let imageOnly = Buffer.alloc(indexOfEndOfImage - indexOfForthLine + 2);

        bodyBuffer.copy(imageOnly, 0, indexOfForthLine + 2, indexOfEndOfImage);

        await fsAsync.writeFile(`./img/uploaded_${filename}`, imageOnly);

        response.writeHead(301, {
            'Location': '/'
        });
        response.end();
    })
}

module.exports = {
    createImage
};
