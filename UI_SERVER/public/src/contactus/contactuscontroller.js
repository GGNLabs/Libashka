(function () {
    'use strict';
    angular.module('contactus', []);

    angular
        .module('contactus')
        .controller('ContactusController', ['$rootScope', '$window', '$routeParams', '$mdSidenav', 'httpService', '$log', '$q', '$location', '$scope', ContactusController]);

    function ContactusController($rootScope, $window, $routeParams, $mdSidenav, httpService, $log, $q, $location, $scope) {
        var cc = this;

        cc.saveContact = function () {
            var request = {
                method: "post",
                url: GLOBALCONFIG.ServiceManager.getUrls('getContactDetails'),
                data: cc.contact,
                headers: {
                    'Content-Type': "application/json"
                }
            };
            httpService.makeRequest(request, function (data) {
                alert("Details Submitted Successfuly! We will get back to you as soon as possible.");
            }, function (err) {
                console.log(err);
                alert("Unable to send mail. Please try again later.");
            });
        }
        return cc;
    }
})();