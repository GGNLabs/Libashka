(function () {
    'use strict'

    angular.module('products')
        .service('productsService', ['$q', '$http', '$timeout', ProductsService]);

    function ProductsService($q, $http, $timeout) {
        return {
            getAllProducts: function (productCategory) {
                var deferred = $q.defer();

                var request = $http({
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductDetails')
                });

                request.success(function (data) {
                    deferred.resolve(data);
                });

                return deferred;

            },
            getProductsById(productId) {
                var deferred = $q.defer();
                var request = $http({
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductDetails') + '/' + productId
                });
                request.success(function (data) {
                    deferred.resolve(data);
                });
                return deferred;
            },
            searchProducts: function (searchKey) {

            },
            getProductsByCategory: function (categoryID) {
                var deferred = $q.defer();

                //check for undefined
                var request = $http({
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductByCategory') + "/" + categoryID
                });

                request.success(function (data) {
                    deferred.resolve(data);
                });

                return deferred;
            },
            getAllNewProducts: function () {
                var deferred = $q.defer();
                var request = $http({
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductDetails')
                });
                request.success(function (data) {
                    deferred.resolve(data.filter(function (product) {
                        return product.DisplayAsNew
                    }));
                });
                return deferred;
            }
        };
    }
})();