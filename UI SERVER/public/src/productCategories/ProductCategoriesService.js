(function () {
    'use strict'

    angular.module('productcategories')
        .service('productcategoriesService', ['$q', 'httpService', ProductCategoriesService]);

    function ProductCategoriesService($q, httpService) {
        return {
            getAllProductCategories: function () {
                var deferred = $q.defer();

                var request = {
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductCategories')
                };

                httpService.makeRequest(request, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    alert(err);
                    deferred.reject(err);
                });

                return deferred;
            },
            getProductCategoryByID: function () {
                //read individual records to create subcategories. Is this the nosql way of doing this?

                var deferred = $q.defer();

                var request = {
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductCategories')
                };

                httpService.makeRequest(request, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    alert(err);
                    deferred.reject(err);
                });

                return deferred;
            }
        };
    }
})();