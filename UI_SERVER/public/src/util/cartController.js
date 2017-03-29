(function () {
    'use strict';
    angular
        .module('util')
        .controller('cartController', ['$rootScope', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', 'localStorage', '$location', cartController]);

    function cartController($rootScope, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $scope, localStorage, $location) {
        var self = this;
        var cartKey = 'cartItems';
        self.cartItems = localStorage.getData(cartKey) || [];
        self.getCartItemCount = function () {
            var count = 0;
            self.cartItems.map(function (x) {
                count += x.quantity;
            });
            return count;
        }

        self.getCost = function () {
            var cost = 0;
            var currency = '';
            self.cartItems.forEach(function (item) {
                cost += item.price * item.quantity;
                currency = item.currency;
            });
            return currency + " " + Math.round(cost * 100) / 100;
        }

        self.removeItem = function (index) {
            $rootScope.$emit('itemRemovedFromCart', index);
        }

        self.buyNow = function () {
            $location.path('/checkout');
        }

        self.showDetails = function (item) {
            $location.path('/products/' + item._id)
        }


        var flyToCart = function (product, callback) {
            var cart = $('.cart');
            //var obj = '#' + product._id;
            var imgtodrag = $(".img_" + product._id);
            if (imgtodrag) {
                var imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '1000'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                    }, 1000, 'swing', callback);

                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                });
            }
        };

        $rootScope.$on('itemAddedToCart', function (event, item) {
            flyToCart(item, function () {
                console.log("Animation Successful")
            });
            var existingItem = self.cartItems.filter(function (x) {
                if (x._id == item._id) {
                    return x;
                }
            });
            if (existingItem && existingItem.length > 0) {
                existingItem[0].quantity++
            } else {
                item.quantity = 1;
                self.cartItems.push(item);
            }
            localStorage.setData(cartKey, self.cartItems);
        });

        $rootScope.$on('itemRemovedFromCart', function (event, index) {
            var item = self.cartItems[index];
            item.quantity > 1 ? item.quantity-- : self.cartItems.splice(index, 1);
            localStorage.setData(cartKey, self.cartItems);
        });
    }
})();