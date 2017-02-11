(function (defaultSetup) {
    var data = require('../data'),
        config = require('../config'),
        tableName = 'productCategory',
        tableNameProduct = 'product';

    var getCategoryRequestObj = function (name, category, parentCategory) {
        return request = {
            table: tableName,
            model: {
                Name: name,
                Category: category,
                ParentCategory: parentCategory,
                IsActive: true
            }
        };
    }

    var createCategory = function (category, iterator) {
        var categoryName = Object.keys(category)[0];
        var request = getCategoryRequestObj(categoryName, categoryName, null)

        data.create(request, function (err, response) {
            console.log(err || response);
            if (!err) {
                createSubCategory(category[categoryName], response);
                if (iterator == 0) {
                    createProducts();
                }
            }
        });
    }

    var createProducts = function () {
        var newProducts = config.NewProducts;
        newProducts.forEach(function (product) {
            var request = {
                table: tableNameProduct,
                model: product
            };
            data.create(request, function (err, response) {
                console.log(err || response);
                if (!err) {
                    console.log(response);
                }
            });
        });
    };

    var createSubCategory = function (subCategory, ParentId) {
        if (typeof subCategory == "object") {
            if (subCategory.length > 0) {
                subCategory.forEach(function (cat) {
                    var request = getCategoryRequestObj(cat, cat, ParentId)
                    data.create(request, function (err, response) {
                        console.log(err || response);
                    });
                });
            } else {
                Object.keys(subCategory).forEach(function (key) {
                    var request = getCategoryRequestObj(key, key, ParentId)
                    data.create(request, function (err, response) {
                        console.log(err || response);
                        if (!err) {
                            createSubCategory(subCategory[key], response);
                        }
                    });
                });
            }
        }
    }

    defaultSetup.insertDefaultCategories = function () {
        var request = getCategoryRequestObj();
        request.query = {};
        data.read(request, function (err, response) {
            if (!err && response.length <= 0) {
                var categories = config.Categories;
                var iterator = 0;
                categories.forEach(function (category) {
                    createCategory(category, iterator++);
                });
            } else {
                console.log(err || "Product Categories table already created!");
            }
        });
    }
})(module.exports);