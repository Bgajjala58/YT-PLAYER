var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.use('/theme.css', function(req, res){
  res.sendFile(__dirname + '/theme.css');

});

app.use('/script.js', function(req, res){
  res.sendFile(__dirname + '/script.js');

});

io.on('connection', function(socket){
      socket.on('Pausebutton', function (type, time) {
                console.log(type);
                console.log(time);
                io.local.emit('Pausebutton', type, time);
                });
      
      socket.on('Playbutton', function (type, time) {
                console.log(type);
                console.log(time);
                io.local.emit('Playbutton', type, time);
                });
      
      socket.on('ToSeek', function (type, time) {
                console.log(type);
                console.log(time);
                io.local.emit('ToSeek', type, time);
                });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
