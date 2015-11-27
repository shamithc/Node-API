// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('./config/config');
var User = require('./app/models/user');
var verifyToken = require('./lib/verify_token')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080;
app.set('superSecret', config.secret);

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/Node-API');

var bear_routes = require('./config/routes/bear');
var user_routes = require('./config/routes/user');
var authenticate_routes = require('./config/routes/authenticate');


app.use('/api/', authenticate_routes);
app.use(verifyToken);
app.use('/api/users', user_routes);
app.use('/api/bears/', bear_routes);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
