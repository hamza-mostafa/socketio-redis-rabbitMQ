const app = require('express')();
const bodyParser = require('body-parser');
// morgan logs to console
const morgan = require('morgan');
const config = require('./config');
const RateLimit = require('express-rate-limit');
// winston logs to var file => /var/log/log-file.log
const winston = require('./app/Helpers/loggerWin');
const io = require('./integrations/socketer');
const v1 = require('./app/Routes/version1');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
   extended: false
}));

app.get('/', function(req, res, next){
   res.sendFile(__dirname + '/public/general.html');
})
app.get('/admin', function(req, res, next){
   res.sendFile(__dirname + '/public/admin.html');
})
app.get('/user', function(req, res, next){
   res.sendFile(__dirname + '/public/user.html');
})

// use morgan to log requests to the console
morgan.format('theFormat', '[:date[clf]] - :remote-addr - :req[location] - :req[content-type]- :user-agent  - :method - :url - reponse status :status - :res[content-length] - :response-time ms');
app.use(morgan('theFormat', {
    stream: winston.stream
}));

app.use(bodyParser.json());


let limiter = new RateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // limit each IP to 100 requests per windowMs
   delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.use(limiter);

app.use('/api/v1(.0)?', v1);

// =======================
// reoute method error handling ================
// =======================
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;