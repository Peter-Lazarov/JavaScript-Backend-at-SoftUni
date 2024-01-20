const fs = require('fs').promises;

async function start(){
    const result = await fs.readdir('.');

    for (let item of result) {
        let itemStatus = await fs.stat(`./${item}`);
        if(itemStatus.isDirectory()){
            console.log(item, 'is a directory');
        } else {
            console.log(item, 'is a file');
        }
    }
}

start();
