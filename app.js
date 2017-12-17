var express         = require('express');
var path            = require('path');
var mongoose    = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

global.config = require('./config');
mongoose.connect(config.mongoUrl);
global.db = mongoose.connection;

mongoose.connect(config.mongoUrl);
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',function(req,res){
    res.send('hallo')
});
app.use('/', require('./src/route'));
app.use('/', require('./src/controllers/PortfolioController'));
app.use('/', require('./src/controllers/AuthenticationController'));
app.use('/', require('./src/controllers/TicketController'));
app.use('/', require('./src/middleware/TokenValidator'));

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});
