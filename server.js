const http = require('http');
const port = process.env.PORT || 8000;
const app = require('./app');
const amqp = require('./app/Controllers/AMQPController');

const server = http.createServer(app);
server.listen(port, function () {
    console.log(`magic happens on port  ${port}`);
});

let io = require('socket.io')(server);

const admin = io.of('/admin');
const user = io.of('/user');

io.on('connection', function(socket){
  console.log('general channel');
  console.log(amqp.receiveMessage('general', 'general stuff'));
  // socket.broadcast.emit('hi');
});

admin.on('connection', function(socket){
  console.log('this is admin only');
  console.log(amqp.receiveMessage('admin', 'admin stuff'));
  // socket.broadcast.emit('hi');
});


user.on('connection', function(socket){
    console.log('this is user only');
    console.log(amqp.receiveMessage('user', 'user stuff'));
    // socket.broadcast.emit('hi');
  });