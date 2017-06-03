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
        cc.toLocalDate = function (CreatedDate) {
            return new Date(CreatedDate).toLocaleDateString();
        }
        cc.reply = function (item) {

            cc.mail = {
                to: item.email,
                subject: "Re: Tripti's Libashka Contact Reply",
                body: item.query
            };
            var request = {
                method: "put",
                url: GLOBALCONFIG.ServiceManager.getUrls('getContactDetails', item._id),
                headers: {
                    'Content-Type': "application/json"
                },
                data: {
                    IsRead: true
                }
            };
            httpService.makeRequest(request, function (data) {
                cc.initialize();
            }, function (err) {
                console.log(err);
                alert("Unable to mark email as read");
            });

        }

        cc.send = function () {
            var request = {
                method: "post",
                url: "http://localhost:1338/api/mail",
                headers: {
                    'Content-Type': "application/json"
                },
                data: cc.mail
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