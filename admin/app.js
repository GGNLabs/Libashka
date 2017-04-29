var express = require('express'),
    aws = require('aws-sdk'),
    bodyparser = require('body-parser'),
    multer = require('multer'),
    path = require('path'),
    multerS3 = require('multer-s3'),
    fs = require('fs'),
    http = require('http'),
    controllers = require('./controller'),
    config = require('./config');

var app = module.exports = express(),
    router = express.Router();

app.set('config', config);
app.use('/api', bodyparser.json());
controllers.init(app);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
//app.use(express.static(__dirname + '/bower_components'));
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

http.createServer(app).listen(config.port);
console.log("Triptis Server is listening at " + config.port);