const winston = require('winston');

transportConsole = new winston.transports.Console({
    json: false,
    timestamp: true,
    prettyPrint: true,
    colorize: true,
    level: 'db'
});
// EN: 'i' and 'db' log levels will be shown in File, because db is after i and for File transport level is 'i'
transportFileDebug = new winston.transports.File({
    filename: './app/logs/app.log',
    json: true,
    level: 'info'
});
transportFileException = new winston.transports.File({
    filename: './app/logs/exceptions.log',
    json: false,
    level: 'i'
});

// EN: only 'db' will be stored in rediste because 'db' is the last one 

logger = (winston.createLogger)({
    levels: {
        info: 0,
        warn: 1,
        error: 2,
        verbose: 3,
        i: 4,
        db: 5
    },
    transports: [
        transportConsole,
        transportFileDebug
    ],
    exceptionHandlers: [
        transportConsole,
        transportFileException
    ],
    exitOnError: false
});
logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };
winston.addColors({
    info: 'green',
    warn: 'cyan',
    error: 'red',
    verbose: 'blue',
    i: 'gray',
    db: 'magenta'
});
//set timestamp
var date = new Date();


// logger.i('iiiii foobar level-ed message');
// logger.db('dbbbbb foobar level-ed message');
// logger.info('TimeStamp: ' + localTimeStamp);
// logger.warn('warnnnn foobar level-ed message');
// logger.error('errroor foobar level-ed message');

module.exports = logger;