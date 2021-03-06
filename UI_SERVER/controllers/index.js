(function (controller) {
    controller.init = function (app) {

        var config = app.get('config'),
            router = app.get(config.routes.route.name),
            product = require('./product'),
            user = require('./user'),
            cart = require('./cart'),
            about = require('./about'),
            contact = require('./contact'),
            productCategory = require('./productCategory');


        router.route('/products')
            .post(product.addProducts)
            .get(product.getProductDetails);
        router.route('/products/:productId')
            .get(product.getProductDetails)
            .delete(product.deleteProducts)
            .put(product.updateProducts);


        router.route('/productsByCategory/:categoryID')
            .get(product.getProductsByCategory);

        router.route('/productCategories')
            .post(productCategory.addProductCategory)
            .get(productCategory.getProductCategoryDetails);
        router.route('/productCategories/:productCategoryId')
            .get(productCategory.getProductCategoryDetails)
            .delete(productCategory.deleteProductCategory)
            .put(productCategory.updateProductCategory);

        router.route('/carts/:userName?')
            .post(cart.addCart)
            .get(cart.getCartDetails);
        router.route('/carts/:cartId')
            .delete(cart.deleteCart)
            .put(cart.updateCart);

        router.route('/about/:aboutId?')
            .get(about.getDetails)
            .put(about.updateDetails);

        router.route('/contact')
            .get(contact.getDetails)
            .post(contact.postDetails);

        router.route('/users')
            .post(user.addUser);
    };
})(module.exports);