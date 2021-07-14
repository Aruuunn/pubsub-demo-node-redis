const redis = require('redis');


const redisClient = redis.createClient();

redisClient.on("message", function (channel, message) {
    const payload = JSON.parse(message);

    const { phoneNo, Id } = payload;

    // Send sms

    console.log(`[SMS Sevice] Order Details sent to ${phoneNo} via SMS for Order ${Id}`)
})

redisClient.subscribe('order')