(function () {
    'use strict'

    angular.module('products')
        .service('productsService', ['$q', 'httpService', '$timeout', ProductsService]);

    function ProductsService($q, httpService, $timeout) {
        return {
            getAllProducts: function (productCategory) {
                var deferred = $q.defer();

                var request = {
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductDetails')
                };
                httpService.makeRequest(request, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    alert(err);
                });
                return deferred;
            },
            getProductsById: function (productId) {
                var deferred = $q.defer();
                var request = {
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductDetails') + '/' + productId
                };
                httpService.makeRequest(request, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    alert(err);
                });
                return deferred;
            },
            searchProducts: function (searchKey) {

            },
            getProductsByCategory: function (categoryID) {
                var deferred = $q.defer();

                //check for undefined
                var request = {
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductByCategory') + "/" + categoryID
                };

                httpService.makeRequest(request, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    alert(err);
                    deferred.reject(err);
                });
                return deferred;
            },
            getAllNewProducts: function () {
                var deferred = $q.defer();
                var request = {
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductDetails')
                };
                httpService.makeRequest(request, function (data) {
                    deferred.resolve(data.filter(function (product) {
                        return product.DisplayAsNew
                    }));;
                }, function (err) {
                    alert(err);
                    deferred.reject(err);
                });

                return deferred;
            }
        };
    }
})();