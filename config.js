// let rabbit_username= 'admin';
// let rabbit_password = 'mypass';
// let rabbit_port =  '5671';
// let rabbit_host =  'localhost';

module.exports = {
    'secret': 'testSecret',
    // 'database': 'mongodb://localhost:27017/',
    // 'rabbit_connec': `amqps://${rabbit_username}:${rabbit_password}@${rabbit_host}:${rabbit_port}`,
    'rabbit_connect': `amqp://guest:guest@localhost:5672/`,
    'corsOptions' : {
        /*
        *  currently will add it with * until final deployment
        */
        "origin": "*", // whitelist
        /*
        * to block the servers from scraping the website remove !origin
        */
        // origin: function (origin, callback) {
        //   if (whitelist.indexOf(origin) !== -1 || !origin) {
        //     callback(null, true)
        //   } else {
        //     callback(new Error('Not allowed by CORS'))
        //   }
        // },
        "methods": "GET,PUT,POST,DELETE",
        "preflightContinue": false,
      }
};

let whitelist = ['http://localhost:8000', 'https://expressjs.com'];