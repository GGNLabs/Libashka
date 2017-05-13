(function () {
    'use strict';
    angular.module('contactus', []);

    angular
        .module('contactus')
        .controller('ContactusController', ['$rootScope', '$window', '$routeParams', '$mdSidenav', 'httpService', '$log', '$q', '$location', '$scope', ContactusController]);

    function ContactusController($rootScope, $window, $routeParams, $mdSidenav, httpService, $log, $q, $location, $scope) {
        var cc = this;
        cc.mail = {};
        cc.initialize = function () {
            var request = {
                method: "get",
                url: GLOBALCONFIG.ServiceManager.getUrls('getContactDetails'),
                headers: {
                    'Content-Type': "application/json"
                }
            };
            httpService.makeRequest(request, function (data) {
                cc.contacts = data
            }, function (err) {
                console.log(err);
                alert(err);
            });
        }

        cc.reply = function (item) {
            cc.mail = {
                to: item.email,
                subject: "Re: Tripti's Libashka Contact Reply",
                body: item.query
            };

        }

        cc.send = function () {
            var request = {
                method: "post",
                url: "http://localhost:1337/api/mail",
                headers: {
                    'Content-Type': "application/json"
                },
                body: cc.mail
            };
            httpService.makeRequest(request, function (data) {
                alert("Mail sent successfully!");
            }, function (err) {
                console.log(err);
                alert("Unable to send mail. See console for details!");
            });
        }
        cc.initialize();
        return cc;
    }
})();