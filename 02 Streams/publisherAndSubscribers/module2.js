const { publish } = require('./observer');

let couter = 0;

setInterval(() => {
    publish('message', couter);
    couter++;
}, 2000);
