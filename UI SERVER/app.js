var express = require('express'),
    bodyparser = require('body-parser'),
    fs = require('fs'),
    http = require('http'),
    controllers = require('./controllers'),
    config = require('./configuration'),
    cors = require('./middlewares/allowCORS'),
    requestifier = require('./helpers/requestifier');

var app = module.exports = express(),
    router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.set('config', config);
app.set('requestifier', requestifier);
app.set(config.routes.route.name, router);

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(cors);
app.use(config.routes.route.path, router);

controllers.init(app);
http.createServer(app).listen(config.port);
console.log('Triptis Server is listening at %s', config.port);