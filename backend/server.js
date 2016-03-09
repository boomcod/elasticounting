var express = require('express');
var app = express();
var elasticsearch = require('elasticsearch');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
 
// config files
var db = require('./config/db');
 
// set our port
var port = 3000; 
 
// connect to  elasticsearch  
var client = new elasticsearch.Client({
  host: db.elasticSearchHost,
  log: 'trace'
});
 
// parse application/json 
app.use(bodyParser.json()); 
 
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
 
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 
 
//set the public folder of the app
app.use(express.static(path.join(__dirname, '../frontend'))); 
 
//load basic route for server
require('./routes/basic')(app); 
 
// startup our app at http://localhost:3000
app.listen(port);               
 
// shoutout to the user                     
console.log('Server available at http://localhost:' + port);
 
// expose app           
exports = module.exports = app;