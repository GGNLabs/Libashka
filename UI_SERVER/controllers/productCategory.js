(function (productCategory) {

    var requestifier = require('../helpers/requestifier'),
        cipher = require('../helpers/cipher'),
        responseSender = require('../helpers/responseSender'),
        config = require('../configuration'),
        stringFormatter = require('../helpers/stringFormatter');

    productCategory.getProductCategoryDetails = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('productCategories', req.params.productCategorytId),
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };

    productCategory.addProductCategory = function (req, res) {
        var requestifyObj = {
            url: config.DBManager.getUrls('productCategories'),
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
    productCategory.deleteProductCategory = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('productCategories', req.params.productId)
        };
        requestifier.delete(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err, productResponse) {
            responseSender.send(err, null, res);
        });
    };
    productCategory.updateProductCategory = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('productCategories', req.params.productId),
            data: req.body,
            options: {
                headers: {
                    contentType: 'application/json'
                }
            }
        };
        requestifier.put(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    }

})(module.exports);