const { emitter } = require('./observer');

emitter.on('message', (dataContent) => {
    console.log('module 1 received data ', dataContent);
});
