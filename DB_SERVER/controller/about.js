(function (about) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        tableName = 'about';

    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    }

    about.getDetails = function (req, res) {
        var request = {};
        request.table = tableName;
        var userName = req.params.userName;
        request.query = {
            $and: [{
                "UserName": userName
                    }, {
                IsActive: true
                    }]

        };
        if (req.query & req.query.status) {
            request.query.$and.push({
                'Status': req.query.status
            });
        }
        data.read(request, function (err, response) {
            if (err) {
                return responseSender.send(err, null, res);
            }
            responseSender.send(null, response, res);
        });
    };

    about.addItem = function (req, res) {
        var request = {
            table: tableName,
            model: req.body
        };

        data.create(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    };

    about.deleteItem = function (req, res) {
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

    about.updateItem = function (req, res) {
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