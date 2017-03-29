(function () {
    'use strict'

    angular.module('user')
        .service('userService', ['$q', 'httpService', '$timeout', userService]);

    function userService($q, httpService, $timeout) {
        return {
            addUser: function (user, successCallback, errorCallback) {
                var requestJSON = {
                    method: "POST",
                    url: GLOBALCONFIG.ServiceManager.getUrls('addUser'),
                    data: user
                }
                httpService.makeRequest(requestJSON, successCallback, errorCallback);
            },
        };
    }
})();