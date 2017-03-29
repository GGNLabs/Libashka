(function (cart) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        tableName = 'cart';

    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    }

    cart.getCartDetails = function (req, res) {
        var request = {};
        request.table = tableName;
        if (req.query & req.query.status) {
            request.query = {
                'Status': req.query.status
            };
        }
        data.read(request, function (err, response) {
            if (err) {
                return responseSender.send(err, null, res);
            }
            responseSender.send(null, response, res);
        });
    };

    cart.addCartItem = function (req, res) {
        var request = {
            table: tableName,
            model: req.body
        };

        data.create(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    };

    cart.deleteCartItem = function (req, res) {
        var request = {};
        request.table = tableName;
        request.model = {
            IsActive: false
        };
        request.query = {
            "_id": req.params.cartId
        };
        updateTable(request, res);
    };

    cart.updateCartItem = function (req, res) {
        var request = {
            table: tableName,
            model: req.body,
            query: {
                "_id": req.params.cartId
            }
        };
        updateTable(request, res);
    }

})(module.exports);