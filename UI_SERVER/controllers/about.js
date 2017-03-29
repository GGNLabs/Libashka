(function (about) {
    var requestifier = require('../helpers/requestifier'),
        cipher = require('../helpers/cipher'),
        responseSender = require('../helpers/responseSender'),
        config = require('../configuration'),
        stringFormatter = require('../helpers/stringFormatter');

    about.getDetails = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('aboutDetails', req.params.userName),
        };
        requestifier.get(requestifyObj, function (productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    };


    about.updateDetails = function (req, res) {
        var requestifyObj = {
            'url': config.DBManager.getUrls('aboutDetails', req.params.cartId),
            data: req.body,
            options: {
                headers: {
                    contentType: 'application/json'
                }
            }
        };
        requestifier.put(requestifyObj, function (err, productResponse) {
            responseSender.send(null, productResponse, res);
        }, function (err) {
            responseSender.send(err, null, res);
        });
    }

})(module.exports);