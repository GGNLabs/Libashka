(function (product) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        tableName = 'product';

    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    }

    product.getProductDetails = function (req, res) {
        var request = {};
        request.table = tableName;
        request.query = {
            IsActive: true
        };
        var productId = req.params.productId;
        if (productId) {
            request.query = {
                $and: [{
                    "_id": productId
                    }, {
                    IsActive: true
                    }]

            };
        }
        data.read(request, function (err, response) {
            if (err) {
                return responseSender.send(err, null, res);
            }

            var result = productId ? response[0] : response;
            responseSender.send(null, result, res);
        });
    };
    product.addProducts = function (req, res) {
        var request = {
            table: tableName,
            model: req.body
        };

        data.create(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    };
    product.deleteProducts = function (req, res) {
        var request = {};
        request.table = tableName;
        request.model = {
            IsActive: false
        };
        var productId = req.params.productId;
        request.query = {
            "_id": productId
        };

        updateTable(request, res);
    };
    product.updateProducts = function (req, res) {
        var request = {
            table: tableName,
            model: req.body,
            query: {
                "_id": req.params.productId
            }
        };
        updateTable(request, res);
    }
    product.getProductsByCategory = function (req, res) {
        var request = {};
        request.table = tableName;
        request.query = {
            IsActive: true
        };
        var categoryID = req.params.categoryID;

        debugger;

//        if (categoryID) {
      //            request.query = {
      //                $and: [{
      //                    "Category": categoryID
      //                    }, {
      //                    IsActive: true
      //                    }]
      //
      //            };
      //        }
        data.read(request, function (err, response) {
            if (err) {
                return responseSender.send(err, null, res);
            }

            //send all products found belonging to current category
            responseSender.send(null, response, res);
        });
    }

})(module.exports);