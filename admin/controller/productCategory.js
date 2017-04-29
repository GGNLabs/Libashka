(function (productCategory) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        config = require('../config'),
        tableName = 'productCategory';

    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    }

    productCategory.getProductCategoryDetails = function (req, res) {
        var request = {};
        request.table = tableName;
        request.query = {
            IsActive: true
        };
        var productCategoryId = req.params.productCategoryId;
        if (productCategoryId) {
            request.query = {
                $and: [{
                    "_id": productCategoryId
                    }, {
                    IsActive: true
                    }]
            };
        }
        data.read(request, function (err, response) {
            if (err) {
                return responseSender.send(err, null, res);
            }
            var result = productCategoryId ? response[0] : response;
            responseSender.send(null, result, res);
        });
    };

    productCategory.addProductCategory = function (req, res) {
        var request = {
            table: tableName,
            model: req.body
        };

        data.create(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    };

    productCategory.deleteProductCategory = function (req, res) {
        var request = {};
        request.table = tableName;
        request.model = {
            IsActive: false
        };
        request.query = {
            "_id": req.params.productCategoryId
        };
        updateTable(request, res);
    };

    productCategory.updateProductCategory = function (req, res) {
        var request = {
            table: tableName,
            model: req.body,
            query: {
                "_id": req.params.productCategoryId
            }
        };
        updateTable(request, res);
    }

    productCategory.getProductCategoryFromConfig = function (req, res) {
        responseSender.send(null, config.Categories, res);
    }

})(module.exports);