// const fs = require('fs');

// const text = fs.readFile('./demo.txt', (error, data) => {
//     if(error != null){
//        return console.error(error.message);
//     }

//     console.log(data.toString());
// });

const fs = require('fs').promises;

async function start(){
    const data = await fs.readFile('./demo.txt');
    console.log(data.toString());
}

start();
