const fs = require('fs');

const text = fs.readFileSync('./demo.txt');

console.log(text.toString());
