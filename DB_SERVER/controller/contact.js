(function (about) {
    var data = require('../data'),
        responseSender = require('../helpers/responseSender'),
        fs = require('fs'),
        config = require('../config'),
        emailSender = require('../helpers/emailSender'),
        tableName = 'contact';



    var updateTable = function (request, res) {
        data.update(request, function (err, response) {
            responseSender.send(err, response, res);
        });
    }

    about.sendMail = function (req, res) {
        fs.readFile('mail.txt', function (err, data) {
            if (err) console.log(err);
            template = data.toString();
            template = template.replace("{{BODY}}", req.body.body);
            var emailDetails = {
                to: [req.body.to],
                subject: req.body.subject,
                body: template
            };
            emailSender.send(emailDetails, function (err, data) {
                responseSender.send(err, data, res);
            });
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
        template = template.replace("{{BODY}}", req.body.query);
        var emailDetails = {
            to: [config.ses.from],
            subject: "New contact : " + req.body.name + " has contacted you! Email Id:" + req.body.email,
            body: template
        };
        emailSender.send(emailDetails, function (err, data) {
            console.log(err || data);
        });
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