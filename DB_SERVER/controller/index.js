(function (controller) {
    controller.init = function (app) {
        var defaultConfigSetup = require('./defaultConfigSetup'),
            user = require('./user'),
            product = require('./product'),
            cart = require('./cart'),
            about = require('./about'),
            contact = require('./contact'),
            productCategory = require('./productCategory');

        defaultConfigSetup.insertDefaultCategories();

        app.get('/api/users/:username?', user.getUserDetails);
        app.post('/api/users', user.addUser);

        app.get('/api/products/:productId?', product.getProductDetails);
        app.post('/api/products', product.addProducts);
        app.delete('/api/products/:productId', product.deleteProducts);
        app.put('/api/products/:productId', product.updateProducts);

        app.get('/api/productsByCategory/:categoryID', product.getProductsByCategory);

        app.get('/api/productCategories/:productCategoryId', productCategory.getProductCategoryDetails);
        app.post('/api/productCategories', productCategory.addProductCategory);
        app.get('/api/productCategories', productCategory.getProductCategoryFromConfig);
        app.delete('/api/productCategories/:productCategoryId', productCategory.deleteProductCategory);
        app.put('/api/productCategories/:productCategoryId', productCategory.updateProductCategory);

        app.get('/api/carts/:userName?', cart.getCartDetails);
        app.post('/api/carts', cart.addCartItem);
        app.delete('/api/carts/:cartId', cart.deleteCartItem);
        app.put('/api/carts/:cartId', cart.updateCartItem);

        app.get('/api/about', about.getDetails);
        app.put('/api/about/:aboutId', about.updateItem);

        app.get('/api/contact', contact.getDetails);
        app.post('/api/contact', contact.addItem);
        app.post('/api/mail', contact.sendMail);
    };
})(module.exports);