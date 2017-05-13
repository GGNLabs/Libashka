var GLOBALCONFIG = {
    ServiceManager: {
        protocol: "http://",
        host: "127.0.0.1",
        port: ":50001",
        urls: {
            getProductDetails: '/api/products',
            getProductCategories: '/api/productCategories',
            getProductByCategory: '/api/productsByCategory',
            registerUser: '/api/users',
            getAboutDetails: '/api/about',
            getContactDetails: '/api/contact',
            checkout: '/api/carts'
        },
        getUrls: function (key, id) { //This function will return a well formed url with one path parameter at the end of url(if parameter exist).
            return window.location.protocol + "//" + window.location.host + this.urls[key] + (id ? "/" + id : '');
        }
    }
}