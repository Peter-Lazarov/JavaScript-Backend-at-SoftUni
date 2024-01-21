const subscribers = {};

function subscribe(dataType, callback){
    console.log('new subscriber for ' + dataType);
    if(subscribers[dataType] == undefined){
        subscribers[dataType] = [];
    }

    subscribers[dataType].push(callback)
}

function publish(dataType, dataContent){
    console.log('received ' + dataType);
    const currentSubscribers = subscribers[dataType];

    if(currentSubscribers){
        for(let subscriber of currentSubscribers){
            subscriber(dataContent);
        }
    }
}

module.exports = {
    subscribe,
    publish
};
