(function () {

    angular
        .module('home')
        .controller('HomeController', ['productsService', '$rootScope', '$location', HomeController]);

    function HomeController(productsService, $rootScope, $location) {
        var hc = this;



        var init = function () {
            productsService.getAllProducts().promise.then(function (data) {
                hc.products = data.filter(function (product) {
                    return product.DisplayAsNew == false
                });
            });
            productsService.getAllNewProducts().promise.then(function (data) {
                hc.newProducts = data;
            });
        }

        init();
        hc.addProductToCart = function (product) {
            $rootScope.$emit('itemAddedToCart', product);
        }

        hc.buyNow = function (product) {
            $rootScope.$emit('itemAddedToCart', product);
            $location.path('/checkout');
        }

        hc.deleteProduct = function (productId) {
            productsService.deleteProducts(productId, function (err, data) {
                if (err) {
                    return alert("Unable to delete Files");
                }
                alert("Files deleted successfully");
                init();
            });
        };
        return hc;
    };
})();