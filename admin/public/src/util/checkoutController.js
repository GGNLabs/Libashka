(function () {
    'use strict';

    angular
        .module('util')
        .controller('checkoutController', ['$rootScope', 'httpService', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$q', '$scope', 'localStorage', '$location', checkoutController]);

    function checkoutController($rootScope, httpService, $routeParams, $mdSidenav, $mdBottomSheet, $mdDialog, $q, $scope, localStorage, $location) {
        var chkc = this;
        var cartKey = 'cartItems';
        var cartItems = localStorage.getData(cartKey) || [];

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        var showAlert = function (cartID) {
            chkc.orderId = cartID;
            $mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };


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
                var request = {
                    method: "POST",
                    url: GLOBALCONFIG.ServiceManager.getUrls('checkout'), //"http://localhost:1338/api/carts",
                    data: {
                        cart: items,
                        user: user
                    }
                };

                httpService.makeRequest(request, function (data) {
                    showAlert(data);
                }, function (err) {
                    alert(err);
                });

            }
        }

        chkc.finishPurchase = function () {
            $location.path('/');
            for (var i = cartItems.length; i >= 0; i--) {
                $rootScope.$emit('itemRemovedFromCart', i);
            }
        };
        return chkc;
    }
})();