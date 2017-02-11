(function (cart) {
    var requestifier = require('../helpers/requestifier'),
        cipher = require('../helpers/cipher'),
        responseSender = require('../helpers/responseSender'),
        config = require('../configuration'),
        stringFormatter = require('../helpers/stringFormatter');

    cart.getCartDetails = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('cartDetails', req.params.userName),
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    cart.addCart = function (req, res) {
        var requestifyObj = {
            url: config.DBManager.getUrls('cartDetails'),
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

    cart.deleteCart = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('cartDetails', req.params.cartId)
        };
        requestifier.delete(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    cart.updateCart = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('cartDetails', req.params.cartId),
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