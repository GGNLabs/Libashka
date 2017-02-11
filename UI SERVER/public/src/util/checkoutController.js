(function () {
    'use strict';

    angular
        .module('util')
        .controller('checkoutController', ['$rootScope', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', 'localStorage', '$location', checkoutController]);

    function checkoutController($rootScope, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $scope, localStorage, $location) {}
})();