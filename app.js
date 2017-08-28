var express       = require('express')
  , app           = express();
var http          = require('http');
var favicon       = require('serve-favicon');
var path          = require('path');
var bodyParser    = require('body-parser');
var ikea          = require('./routes/ikea');
var config        = require('./config');

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')))

app.use('/api/ikea', ikea);

var port = config.web.port;
app.listen(port, function() {
  console.log('Listening on port ' + port);
})
