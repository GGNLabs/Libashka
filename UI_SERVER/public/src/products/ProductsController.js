(function () {

    angular
        .module('products')
        .controller('ProductsController', ['productsService', '$rootScope', '$window', 'productcategoriesService', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$location', ProductsController]);


    function ProductsController(productsService, $rootScope, $window, productcategoriesService, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $location) {
        var self = this;

        self.currentProduct = '';
        self.products = null;
        self.productNotAvailable = true;
        self.productsInDisplay = null;

        self.buyNow = function (product) {
            self.addProductToCart(product);
            $location.path('/checkout');
        }

        self.addProductToCart = function (product) {
            $rootScope.$emit('itemAddedToCart', product);
        }

        self.getProduct = function () {
            var productId = $routeParams.productId;
            productId ? productsService.getProductsById(productId).promise.then(function (data) {
                self.product = data;
            }) : '';
        }

        self.setDivHeight = function () {
            self.imgHeight = document.getElementById('large-Image-Product').offsetHeight;
            console.log(self.imgHeight);
        }

        if ($routeParams.categoryID) {
            productsService.getProductsByCategory($routeParams.categoryID).promise.then(function (data) {
                self.products = data;

                self.productsInDisplay = data.filter(function (o) {
                    if (checkValueForFilters(o.Category)) {
                        return o;
                    }
                });


                if (self.productsInDisplay.length > 0) {
                    self.productNotAvailable = false;
                }

                $rootScope.$emit('productListLoaded', self.products);
            })
        } else {
            productsService.getAllProducts().promise.then(function (data) {
                self.products = data;
                self.productsInDisplay = data;
                $rootScope.$emit('productListLoaded', self.products);
            });
        }

        self.getArray = function (num) {
            return new Array(num);
        };

        function checkValueForFilters(category) {
            var filters = $routeParams.categoryID.split("_");
            var found = true;

            filters.forEach(function (item, index, arr) {
                if (category.indexOf(item) === -1) {
                    found = false;
                    return;
                }
            })

            return found;
        }

        function checkValueForFiltersExclusive(category, filter) {
            var filters = filter.split("_");
            var found = false;

            filters.forEach(function (item, index, arr) {
                if (category.indexOf(item) !== -1) {
                    found = true;
                    return;
                }
            })

            return found;
        }

        $rootScope.$on('productListFiltered', function (event, filter) {
            if (filter.type === "category") {
                self.productsInDisplay = self.products.filter(function (o) {
                    if (checkValueForFiltersExclusive(o.Category, filter.value.join("_"))) {
                        return o;
                    }
                });
            } else if (filter.type === "pricerange") {

                var priceArray = filter.value.split(";");

                self.productsInDisplay = self.products.filter(function (o) {
                    if (o.price >= priceArray[0] && o.price <= priceArray[1]) {
                        return o;
                    }
                });
            }
        });

    }
})();