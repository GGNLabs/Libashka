var config = require('../config'),
    mongoose = require('mongoose'),
    join = require('path').join,
    fs = require('fs');


var opts = {
    server: {
        auto_reconnect: config.mongoose.auto_reconnect,
        socketOptions: {
            connectTimeoutMS: config.mongoose.conn_timeout
        }
    },
    user: config.mongoose.username,
    pass: config.mongoose.password
};

var uri = config.mongoose.dbtype + config.mongoose.baseuri + ':' + config.mongoose.port + '/' + config.mongoose.database;
mongoose.connect(uri, opts);

var model = {
    collection: {
        user: require('./user'),
        product: require('./product'),
        productCategory: require('./productCategory'),
        cart: require('./cart')
    }
};
exports.schemas = model;