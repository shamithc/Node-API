// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port



var bear_routes = require('./config/routes/bear');
app.use('/api/bears/', bear_routes);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
