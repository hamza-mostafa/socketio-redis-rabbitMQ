const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', function(err){
   console.log('Something went wrong ', err)
 });

 module.exports = redisClient;