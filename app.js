var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();

server.listen(8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "f5a70d70-0268-444e-b206-918e49573783",
    appPassword: "cVu4nU7RLtrpsYNLgRfqbQi"
});


function respond(req, res, next) {
  console.log(req);
  res.send('hello ' + req.params);
  next();
}

// Listen for messages from users
// server.post('/api/messages', connector.listen());
server.get('/messages', respond);
server.post('/messages', respond);


// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Clover echoes: %s", session.message.text);
});
