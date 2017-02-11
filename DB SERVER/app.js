var express = require('express'),
    bodyparser = require('body-parser'),
    config = require('./config'),
    controller = require('./controller'),
    fs = require('fs'),
    http = require('http');

var app = module.exports = express();
app.set('config', config);
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

controller.init(app);
var port = eval(config.port);
http.createServer(app).listen(port);
console.log('Running Database Management Service on port:' + port + '...');