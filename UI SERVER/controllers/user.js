(function (user) {
    var requestifier = require('../helpers/requestifier'),
        cipher = require('../helpers/cipher'),
        responseSender = require('../helpers/responseSender'),
        config = require('../configuration'),
        stringFormatter = require('../helpers/stringFormatter');

    var updateTable = function (request, res) {}

    user.getUsers = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('users', req.params.userId),
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    user.addUser = function (req, res) {
        var requestifyObj = {
            url: config.DBManager.getUrls('users'),
            data: req.body,
            options: {
                headers: {
                    contentType: 'application/json'
                }
            }
        };
        requestifier.post(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    user.deleteUser = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('users', req.params.userId)
        };
        requestifier.delete(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    user.updateUser = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('users', req.params.userId),
            data: req.body,
            options: {
                headers: {
                    contentType: 'application/json'
                }
            }
        };
        requestifier.put(requestifyObj, function (err, productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    }

})(module.exports);