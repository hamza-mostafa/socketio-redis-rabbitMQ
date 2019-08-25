const jwt = require('jsonwebtoken');
const config = require('../../config'); // get our config file

exports.getToken = (req) => {

    return req.body.token || req.headers["token"];
};


exports.decodedToken = (token) => {
    return jwt.verify(token, config.secret);
};

exports.generateToken = () => jwt.sign({
   // add the payload you want here
}, config.secret, {
       expiresIn: "1h"
   });