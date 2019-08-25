const router = require('express').Router();
const redisClient = require('../../../integrations/redis');

// for testing purposes

router.get('/', function(req, res){
   // console.log(req.params.message);
   console.log('req.params.message');
   redisClient.hset('MobileNumber', req.query.key, req.query.message, redis.print);
   res.sendFile(__dirname + '/public/index.html');
 });
 
 router.get('/2', function(req, res){
   redisClient.hgetall('MobileNumber', function(error, result) {
       if (error) throw error;
       console.log('GET result ->');
       console.log(JSON.stringify(result));
   });
   res.sendFile(__dirname + '/public/index2.html');
 });

module.exports = router;