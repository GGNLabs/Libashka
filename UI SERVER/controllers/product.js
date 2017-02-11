(function (product) {
    var requestifier = require('../helpers/requestifier'),
        cipher = require('../helpers/cipher'),
        responseSender = require('../helpers/responseSender'),
        config = require('../configuration'),
        stringFormatter = require('../helpers/stringFormatter');

    var updateTable = function (request, res) {}

    product.getProductDetails = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('productDetails', req.params.productId),
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    product.getProductsByCategory = (function (req, res) {
        //pass category id here
        var requestifyObj = {
            'url': config.DBManager.getUrls('productsByCategory', req.params.categoryID)
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    });

    product.addProducts = function (req, res) {
        var requestifyObj = {
            url: config.DBManager.getUrls('productDetails'),
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
    product.deleteProducts = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('productDetails', req.params.productId)
        };
        requestifier.delete(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };
    product.updateProducts = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('productDetails', req.params.productId),
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