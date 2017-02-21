(function () {
    'use strict';

    angular
        .module('util')
        .controller('checkoutController', ['$rootScope', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', 'localStorage', '$location', checkoutController]);

    function checkoutController($rootScope, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $scope, localStorage, $location) {
        var chkc = this;

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        var validateUser = function (user) {
            var isValid = true;

            if (!user) {
                alert('Please enter user details');
                return false;
            }

            if (!user.name) {
                alert('Please enter valid name');
                return false;
            }

            if (!user.email) {
                alert('Please enter valid email');
                return false;
            }

            if (!validateEmail(user.email)) {
                alert('Please enter valid email');
                return false;
            }

            if (!user.phone) {
                alert('Please enter valid mobile number');
                return false;
            }

            if (!user.address) {
                alert('Please enter valid address');
                return false;
            }

            if (!user.state) {
                alert('Please enter valid state');
                return false;
            }

            if (!user.country) {
                alert('Please enter valid country');
                return false;
            }

            if (!user.zip) {
                alert('Please enter valid zip');
                return false;
            }

            return isValid;
        }
        chkc.checkout = function (items, user) {
            if (validateUser(user)) {
                alert(valid);
            }
        }

        return chkc;
    }
})();