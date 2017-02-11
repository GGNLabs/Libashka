(function (user) {
    var data = require('../data');

    user.getUserDetails = function (userName, callback) {
        var request = {};
        request.table = 'user';
        request.query = {
            IsActive: true
        };
        if (userName) {
            request.query = {
                $and: [{
                    UserName: userName
                    }, {
                    IsActive: true
                    }]

            };
        }
        data.read(request, callback);
    };

    user.getUserDetailsApi = function (req, res) {
        user.getUserDetails(req.params.userName, function (err, response) {
            var result = {
                isError: false,
                error: null,
                data: {}
            };
            if (err) {
                result.isError = true;
                result.error = err;
                result.data = null;
                res.json(result);
                return;
            }
        });
    };

    user.addUser = function (req, res) {
        var request = {
            table: 'user',
            model: req.body
        };
        var result = {
            isError: false,
            error: null,
            data: {}
        };
        user.getUserDetails(req.body.UserName, function (err, response) {
            if (err || !response) {
                result.isError = true;
                result.error = err;
                result.data = null;
                return res.json(result);
            }
            if (response.length > 0) {
                result.data = response._Id;
                return res.json(result);
            }
            data.create(request, function (err, response) {
                result.data = response;
                if (err) {
                    result.isError = true;
                    result.error = err;
                    result.data = null;
                }
                res.json(result);
            });
        });
    };

})(module.exports);