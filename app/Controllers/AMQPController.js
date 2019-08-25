// const config = require('../../config');
// const amqp = require('amqplib/examples');
// const amqpCon = amqp.connect(config.rabbit_connec);
// let exchange = 'CRM';

// exports.receiveMessage = async (key) => {
//     try {
//         amqp.connect(config.rabbit_connec, function(error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function(error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     var exchange = 'CRM';

//     channel.assertExchange(exchange, 'topic', {
//         confirm: true, durable: true, autoDelete: false 
//     });

//     channel.assertQueue('admin stuff', {
//       exclusive: true
//     }, function(error2, q) {
//       if (error2) {
//         throw error2;
//       }
//       console.log(' [*] Waiting for logs. To exit press CTRL+C');

//     //   args.forEach(function(key) {
//         channel.bindQueue(q.queue, exchange, key);
//     //   });

//       channel.consume(q.queue, function(msg) {
//         console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
//       }, {
//         noAck: true
//       });
//     });
//   });
// });
//             // await amqp.connect(config.rabbit_connec)
//             //     .then(conn => conn.createChannel(''))
//             //     .then(async (channel) => {
//             //         channel.assertExchange(exchange, 'topic', {
//             //             durable: true
//             //           });
//             //           awauchannel.assertQueue()
//             //             .then((q) => {
//             //                 channel.bindQueue(q.queue, exchange, key);
//             //                 channel.consume(q.queue, async (msg) => {
//             //                     console.log(msg.content.toString());
//             //                     const result = msg.content.toString();
//             //                     // ch.close(function () {
//             //                     //     conn.close()
//             //                     // });
//             //                     await resolve(result);

//             //                 });
//             //             });
//             //     });

//     } catch (e) {
//         console.log('error', e);
//     }
// };

var amqp = require('amqplib/callback_api');
var basename = require('path').basename;

function bail(err, conn) {
  console.error(err);
  if (conn) conn.close(function() { process.exit(1); });
}

function on_connect(err, conn) {
  if (err !== null) return bail(err);
  process.once('SIGINT', function() { conn.close(); });

  conn.createChannel(function(err, ch) {
    if (err !== null) return bail(err, conn);
    var ex = 'CRM', exopts = {durable: true};
    exports.receiveMessage = (key, queueName) => {
    ch.assertExchange(ex, 'topic', exopts);
    ch.assertQueue(queueName, {exclusive: false}, function(err, ok) {
      if (err !== null) return bail(err, conn);

    ch.bindQueue(ok.queue, ex, key);

      ch.consume(ok.queue, logMessage, {noAck: true}, function(err) {
        if (err !== null) return bail(err, conn);
        console.log(' [*] Waiting for logs. To exit press CTRL+C.');
      });
      
      
    });
}
  });
}

function logMessage(msg) {
  console.log(" [x] %s:'%s'",
              msg.fields.routingKey,
              msg.content.toString());
}

amqp.connect(on_connect);