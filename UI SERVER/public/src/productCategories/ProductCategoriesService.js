(function () {
    'use strict'

    angular.module('productcategories')
        .service('productcategoriesService', ['$q', '$http', ProductCategoriesService]);

    function ProductCategoriesService($q, $http) {
        return {
            getAllProductCategories: function () {
                var deferred = $q.defer();

                var request = $http({
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductCategories')
                });

                request.success(function (response) {
                    deferred.resolve(response);
                });

                return deferred;
            },
            getProductCategoryByID: function () {
                //read individual records to create subcategories. Is this the nosql way of doing this?

                var deferred = $q.defer();

                var request = $http({
                    method: "get",
                    url: GLOBALCONFIG.ServiceManager.getUrls('getProductCategories')
                });

                request.success(function (response) {
                    deferred.resolve(response);
                });

                return deferred;
            }
        };
    }
})();