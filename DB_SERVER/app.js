var express = require('express'),
    bodyparser = require('body-parser'),
    config = require('./config'),
    controller = require('./controller'),
    fs = require('fs'),
    http = require('http');

var app = module.exports = express();
app.use(function (req, res, next) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Token');
    next();
});
app.set('config', config);
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

controller.init(app);
var port = eval(config.port);
http.createServer(app).listen(port);
console.log('Running Database Management Service on port:' + port + '...');