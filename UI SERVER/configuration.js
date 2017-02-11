'use strict';
module.exports = {
    'port': process.env.SERVICEMANAGERPORT || '50001',
    'routes': {
        route: {
            'path': '/api',
            'name': 'router'
        }
    },
    DBManager: {
        protocol: "http://",
        host: "127.0.0.1",
        port: ":1338",
        urls: {
            productDetails: '/api/products',
            productCategories: '/api/productCategories',
            productsByCategory: '/api/productsByCategory',
            cartDetails: '/api/carts',
            users: '/api/users'
        },
        getUrls: function (key, id) { //This function will return a well formed url with one path parameter at the end of url(if parameter exist).
            return this.protocol + this.host + this.port + this.urls[key] + (id ? "/" + id : '');
        }
    }
};