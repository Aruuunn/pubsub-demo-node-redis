const redis = require('redis');


const redisClient = redis.createClient();

redisClient.on("message", function (channel, message) {
    const payload = JSON.parse(message);

    const { Id, email } = payload;

    // Send email

    console.log(`[Email Sevice] Order details sent to ${email}. via email for Order ${Id}`)
})

redisClient.subscribe('order')