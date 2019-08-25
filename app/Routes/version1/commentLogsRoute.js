const router = require('express').Router();
const redisClient = require('../../../integrations/redis');


router.get('/:clientId', async function(req, res, next){
  console.log('/:clientId');
  try {
    await redisClient.hgetall(req.params.clientId, async function(error, result) {
        if (error) throw error;
        return await res.json(JSON.stringify(result));
    });
  }catch(e){
    next(e);
  }
});


router.get('/:clientId/:key', async function(req, res, next){
  console.log('/:clientId/:key');
  try {
    await redisClient.hget(req.params.clientId,req.params.key, async function(error, result) {
        if (error) throw error;
        return await res.json(JSON.stringify(result));
    });
  }catch(e){
    next(e);
  }
});


 router.post('/:clientId', async function(req, res, next){
   // need to see if they are able to post comments or no
  try {
    await redisClient.hset(req.params.clientId, req.query.key // consists of comment owner and commentID == time in EPOCH
                          , req.query.message, redis.print);
    res.json({message: 'created'});
  }catch(e){
    next(e);
  }
 });

 router.put('/:clientId/:key', async function(req, res, next){
  // need to confirm if the updater is the owner
  try {
    await redisClient.hset(req.params.clientId, req.params.key, req.query.message, redis.print);
    res.json({message: 'updated'});
  }catch(e){
    next(e);
  }
 });

 router.delete('/:clientId/:key', async function(req, res, next) {
  // need to confirm if the deleter is the owner
  try {
    await redisClient.hset(req.params.clientId, req.params.key, req.query.message, redis.print);
    res.json({message: 'deleted'});
  }catch(e){
    next(e);
  }
 });

module.exports = router;