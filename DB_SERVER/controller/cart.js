(function (cart) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        emailSender = require('../helpers/emailSender'),
        fs = require('fs'),
        tableName = 'cart',
        template = '';

    fs.readFile('template.txt', function (err, data) {
        if (err) console.log(err);
        template = data.toString();
        console.log('Template Read');
    });

    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    }
    var getExpectedDate = function (productsArray) {
        var totalTime = productsArray.reduce(function (a, b) {
            return a + b.timeToMake
        }, 0)

        return totalTime + ' Days';
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
            if (err) {
                return responseSender.send(err, null, res);
            }
            responseSender.send(err, response, res);

            template = template.replace("{{SUBJECT}}", "Confirm Your Order!");
            template = template.replace("{{COUNT}}", req.body.Products.length);
            template = template.replace("{{EXPECTEDDATE}}", getExpectedDate(req.body.Products));
            template = template.replace("{{CURRENCY}}", req.body.Products[0].currency);
            template = template.replace("{{TOTALAMOUNT}}", " " + req.body.TotalAmount);
            template = template.replace("{{URL}}", "http://libashka.com");
            template = template.replace("{{ACTION}}", "Confirm Order");
            var emailDetails = {
                to: [req.body.User.email],
                subject: "Tripti's Libashka : Order Confirmation for OrderId " + response,
                body: template
            };
            emailSender.send(emailDetails);
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