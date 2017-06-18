(function (about) {
    var data = require('../data'),
        requestifier = require('../helpers/requestifier'),
        responseSender = require('../helpers/responseSender'),
        tableName = 'contact';

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
                "CreatedDate": {
                    $lt: new Date(),
                    $gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
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
                "_id": req.params.id
            }
        };
        updateTable(request, res);
    }

    about.sendMail = function (req, res) {
        var requestifyObj = {
            url: "http://localhost:1338/api/mail",
            data: req.body,
            options: {
                'Content-Type': 'application/json'
            }
        };
        requestifier.post(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });

    }

})(module.exports);