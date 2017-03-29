(function () {

    angular
        .module('home')
        .controller('HomeController', ['productsService', '$rootScope', '$location', HomeController]);

    function HomeController(productsService, $rootScope, $location) {
        var self = this;
        self.myInterval = 5000;
        self.noWrapSlides = false;
        self.active = 0;
        var slides = self.slides = [];
        var currIndex = 0;


        self.randomize = function () {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };


        slides.push({
            image: "banner1",
            text: "Beautiful necklaces",
            id: 0
        });

        slides.push({
            image: "banner2",
            text: "Exquisite Jewellery",
            id: 1
        });

        slides.push({
            image: 'banner3',
            text: "Bridal Bangles",
            id: 2
        });

        slides.push({
            image: 'banner4',
            text: "Bridal Jewellery",
            id: 3
        });

        var newProducts = productsService.getAllNewProducts();
        newProducts.promise.then(function (data) {
            self.newProducts = data;
        });

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        self.getArray = function (num) {
            return new Array(num);
        };
        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }

        self.addProductToCart = function (product) {
            $rootScope.$emit('itemAddedToCart', product);
        }

        self.buyNow = function (product) {
            $rootScope.$emit('itemAddedToCart', product);
            $location.path('/checkout');
        }
    };
})();