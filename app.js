var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var SocketController = require('./SocketController')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Server } = require("socket.io");
var http = require('http');



var app = express();
app.set('port', 5500);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}
const server = http.createServer(app);
server.listen(5500)
server.on('listening', onListening);

const io = new Server(server);
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


let socketController = new SocketController(io)
socketController.initSocketEvent()


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {'app':app,'io':io};
//test
