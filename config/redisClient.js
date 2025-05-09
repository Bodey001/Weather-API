const Redis = require('ioredis');
const redisClient = new Redis({
    host: process.env.REDIS_HOST,      //Redis service is named 'redis' in Docker Compose
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

//Handle connection events
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// async function redisOperation() {
//     try {
//         //set and retrieve a value
//         await redisClient.set('key1', 'Hello from Node.js and Redis');
//         const value = await redisClient.get('key1');
//         console.log('Value retrieved from Redis:', value);
//     } catch (error) {
//         console.error("Error during Redis operations:", error);
//     } finally {
//         redisClient.quit();
//     };
// };

// redisOperation();


module.exports = redisClient;