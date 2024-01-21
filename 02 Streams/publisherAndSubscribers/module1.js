const {subscribe} = require('./observer');

subscribe('message', (dataContent) => {
    console.log('module 1 received data ', dataContent);
});
