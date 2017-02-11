var GLOBALCONFIG = {
    ServiceManager: {
        protocol: "http://",
        host: "127.0.0.1",
        port: ":50000",
        urls: {
            getProductDetails: '/api/products',
            getProductCategories: '/api/productCategories',
            getProductByCategory: '/api/productsByCategory',
            registerUser: '/api/users'
        },
        getUrls: function (key, id) { //This function will return a well formed url with one path parameter at the end of url(if parameter exist).
            return this.protocol + this.host + this.port + this.urls[key] + (id ? "/" + id : '');
        }
    }
}