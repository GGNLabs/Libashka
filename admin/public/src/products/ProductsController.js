(function () {
    angular
        .module('products')
        .controller('ProductsController', ['productsService', '$rootScope', '$window', 'productcategoriesService', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$location', '$scope', ProductsController]);

    function ProductsController(productsService, $rootScope, $window, productcategoriesService, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $location, $scope) {
        var pc = this;
        var querySring = $location.search();
        pc.product = {};
        pc.upload = function () {
            var formData = new FormData();
            angular.forEach($scope.files, function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });

            productsService.uploadFile(formData, function (err, result) {
                pc.product.ImageUrl = result.url;
            }, function (err) {
                alert(err);
            });
        };

        pc.save = function () {
            productsService.addProduct(pc.product, function (err, result) {
                alert(err ? "Unable to add Product! Please try again later" : result);
            });
        };

        pc.cancel = function () {
            $location.path('/');
        };
        if (querySring.newarrival) {
            pc.product.DisaplayAsNew = true;
        }
        pc.currencies = GLOBALCONFIG.currencies;
        pc.categories = GLOBALCONFIG.categories;
        return pc;
    }
})();