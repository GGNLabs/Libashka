(function (contact) {
    var requestifier = require('../helpers/requestifier'),
        cipher = require('../helpers/cipher'),
        responseSender = require('../helpers/responseSender'),
        config = require('../configuration'),
        stringFormatter = require('../helpers/stringFormatter');

    contact.getDetails = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('contactDetails'),
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };


    contact.postDetails = function (req, res) {

        var requestifyObj = {
            'url': config.DBManager.getUrls('contactDetails'),
            data: req.body,
            options: {
                headers: {
                    contentType: 'application/json'
                }
            }
        };
        requestifier.post(requestifyObj, function (err, productResponse) {
            responseSender.send(null, productResponse, res);
            debugger;
        }, function (err) {
            debugger;
            responseSender.send(err, null, res);
        });
    }

})(module.exports);