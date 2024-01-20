const { emitter } = require('./observer');

let couter = 0;

setInterval(() => {
    emitter.emit('message', couter);
    couter++;
}, 2000);
