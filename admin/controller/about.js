(function (about) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        tableName = 'about';

    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            res ? responseSender.send(err, response, res) : console.log(response);
        });
    }

    about.getDetails = function (req, res) {
        var request = {};
        request.table = tableName;
        request.query = {
            IsActive: true
        };
        data.read(request, function (err, response) {
            if (err) {
                return responseSender.send(err, null, res);
            }
            responseSender.send(null, response, res);
        });
    };

    about.addItem = function (req, res) {
        req.body.forEach(function (profiledata) {
            var request = {
                table: tableName,
                model: profiledata
            };
            if (profiledata._id) {
                request.query = {
                    "_id": profiledata._id
                };
                updateTable(request);
            } else {
                data.create(request, function (err, response) {
                    console.log(err || data);
                });
            }
        });
        responseSender.send(null, "Profile Submitted Successfully!", res);
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