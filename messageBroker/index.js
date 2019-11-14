const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');

const MESSAGE_BROKER_HOST = process.env.MESSAGE_BROKER_HOST;
if(!MESSAGE_BROKER_HOST) throw new Error('No URL value defined for the required environment variable, MESSAGE_BROKER_HOST');

const MESSAGE_BROKER_PORT =  process.env.MESSAGE_BROKER_PORT|| 6379;

const options = {
    host:  MESSAGE_BROKER_HOST,
    port: MESSAGE_BROKER_PORT,
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});

module.exports = {MESSAGE_BROKER_HOST, MESSAGE_BROKER_PORT, pubsub};



