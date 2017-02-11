(function (requestifier) {
    'use strict';
    var requestify = require('requestify');

    requestifier.get = function (requestifyObj, successCallBack, errorCallBack) {
        requestify.get(requestifyObj.url, requestifyObj.options)
            .then(function (response) {
                var result = response.getBody();
                successCallBack(result);
            }, function (err) {
                errorCallBack(err);
            });
    };

    requestifier.post = function (requestifyObj, successCallBack, errorCallBack) {
        try {
            requestify.post(requestifyObj.url, requestifyObj.data, requestifyObj.options)
                .then(function (response) {
                    var result = response.getBody();
                    successCallBack(result);
                }, function (err) {
                    errorCallBack(err);
                });
        } catch (err) {
            errorCallBack(err);
        }
    };

    requestifier.put = function (requestifyObj, successCallBack, errorCallBack) {
        try {
            requestify.put(requestifyObj.url, requestifyObj.data, requestifyObj.options)
                .then(function (response) {
                    var result = response.getBody();
                    successCallBack(result);
                }, function (err) {
                    errorCallBack(err);
                });
        } catch (err) {
            errorCallBack(err);
        }
    };

    requestifier.delete = function (requestifyObj, successCallBack, errorCallBack) {
        requestify.delete(requestifyObj.url, requestifyObj.options)
            .then(function (response) {
                var result = response.getBody();
                successCallBack(result);
            }, function (err) {
                errorCallBack(err);
            });
    };

})(module.exports);