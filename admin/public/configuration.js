var GLOBALCONFIG = {
    ServiceManager: {
        protocol: "http://",
        host: "127.0.0.1",
        port: ":1338",
        urls: {
            getProductDetails: '/api/products',
            getProductCategories: '/api/productCategories',
            getProductByCategory: '/api/productsByCategory',
            registerUser: '/api/users',
            getAboutDetails: '/api/about',
            checkout: '/api/carts',
            uploadFile: '/uploads',
            uploadProfile: '/upload/profile'
        },
        getUrls: function (key, id) { //This function will return a well formed url with one path parameter at the end of url(if parameter exist).
            return window.location.protocol + "//" + window.location.host + this.urls[key] + (id ? "/" + id : '');
        }
    },
    currencies: [{
        value: "£",
        text: "£"
        }, {
        value: "$",
        text: "$"
        }, {
        value: "₹",
        text: "₹"
        }],
    categories: [{
        value: "Women Jewellery Bangels",
        text: "Bangles"
        }, {
        value: "Women Jewellery Earrings",
        text: "Earrings"
        }, {
        value: "Hair & Makeup",
        text: "Hair"
        }]
}