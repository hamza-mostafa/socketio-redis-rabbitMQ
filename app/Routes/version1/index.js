const router = require('express').Router();
const cors = require('cors');

// auth middleware
// const checkAuth = require('../../Middlewares/Authentication');

//routes end points
const commentLogsRoute = require('./commentLogsRoute');
const config = require('../../../config');

router.use('/comments', [cors(config.corsOptions),
                              //  checkAuth,
                              //  pass the rest of the middleware in this array,
                              commentLogsRoute]);

module.exports = router;
