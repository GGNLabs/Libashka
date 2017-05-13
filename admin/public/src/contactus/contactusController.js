(function () {
    'use strict';
    angular.module('contactus', []);

    angular
        .module('contactus')
        .controller('ContactusController', ['$rootScope', '$window', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$location', '$scope', ContactusController]);

    function ContactusController($rootScope, $window, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $location, $scope) {}
})();