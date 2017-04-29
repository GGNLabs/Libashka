(function () {
    angular
        .module('products')
        .controller('ProductsController', ['productsService', '$rootScope', '$window', 'productcategoriesService', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$location', '$scope', ProductsController]);

    function ProductsController(productsService, $rootScope, $window, productcategoriesService, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $location, $scope) {
        var pc = this;
        var querySring = $location.search();
        pc.product = {};
        pc.upload = function () {
            if ($scope.files.length <= 0) {
                return alert("Please select a file");
            }
            $rootScope.$emit("isLoading", true);
            var formData = new FormData();
            angular.forEach($scope.files, function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });

            productsService.uploadFile(formData, function (err, result) {
                if (result) {
                    pc.product.ImageUrl = result.url;
                } else {
                    alert("Unable to upload file");
                }
                $scope.files = [];
                $rootScope.$emit("isLoading");
            }, function (err) {
                $rootScope.$emit("isLoading");
                alert(err);
            });
        };

        pc.save = function () {
            $rootScope.$emit("isLoading", true);
            productsService.addProduct(pc.product, function (err, result) {
                if (err) {
                    alert("Unable to add Product! Please try again later");
                } else {
                    alert("Product Added Successfully : " + result);
                    $location.path("/");
                }
                $rootScope.$emit("isLoading");

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