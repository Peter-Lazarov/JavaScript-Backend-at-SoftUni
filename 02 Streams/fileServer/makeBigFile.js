const fs = require('fs');

const streamForWrite = fs.createWriteStream('./bigFile.txt');
for (let i = 0; i < 2000000; i++) {
    const chunk = `${i} 999999999999999999999999999999999999999999\r\n`;
    streamForWrite.write(chunk);
}

streamForWrite.end();
