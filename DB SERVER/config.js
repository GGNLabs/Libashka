module.exports = {
        'port': process.env.DATABASE_MANAGER_PORT || 1338,
        'mongoose': {
            'dbtype': 'mongodb://',
            'baseuri': '127.0.0.1',
            'port': '27017',
            'database': 'TriptisDataStore',
            'auto_reconnect': 'true',
            'conn_timeout': 10000
                //'username': 'triptisdbuser',
                //'password': 'Tr!9tisDBu$3r'
        },
        NewProducts: [{
            ImageUrl: "assets/img/banner.jpg",
            Name: "Fasionable Bangles",
            currency: "£",
            price: "61.19",
            oldPrice: "120.20",
            timeToMake: 5,
            comment: "Flat 50% Discount",
            Category: "Women Jewellery Bangels"
                    }, {
            ImageUrl: "assets/img/Trending.jpg",
            Name: "Trending Now",
            currency: "£",
            price: "861.19",
            timeToMake: 2,
            Category: "Women Jewellery Bangels"
                    }, {
            ImageUrl: "assets/img/rings.jpg",
            Name: "Royal Rings",
            currency: "£",
            price: "99",
            timeToMake: 45,
            Category: "Women Jewellery Earings"
                    }, {
            ImageUrl: "assets/img/Latest.jpg",
            Name: "Cant Miss this",
            currency: "£",
            price: "299",
            timeToMake: 10,
            Category: "Women Jewellery Bangels"
                    }, {
            ImageUrl: "assets/img/bangle.png",
            Name: "Trendy Bangles",
            currency: "£",
            price: "61.19",
            timeToMake: 1,
            oldPrice: "120.20",
            comment: "Flat 50% Discount",
            Category: "Women Jewellery Bangels"
                    }, {
            ImageUrl: "assets/img/necklace.png",
            Name: "Latest Necklaces",
            currency: "£",
            price: "21.09",
            timeToMake: 5,
            Category: "Women Jewellery Necklace"
                    }, {
            ImageUrl: "assets/img/earring.png",
            Name: "Exclusive Earings",
            currency: "£",
            price: "100.47",
            timeToMake: 5,
            Category: "Women Jewellery Earings"
                    }, {
            ImageUrl: "assets/img/western.jpg",
            Name: "Natural beige colour tunic,perfect for a cocktail or dinner night.",
            currency: "£",
            price: "100.47",
            timeToMake: 5,
            Category: "Women Clothes Indo-Western"
                    }],
        Categories: [{
            "Key": "Men",
            "Categories": [{
                "Key": "Clothes",
                "Categories": [{
                    "Key": "Ethenic"
                }, {
                    "Key": "Indo-Western"
                }, {
                    "Key": "Unstiched-Suits"
                }, {
                    "Key": "Kaftans"
                }]
            }]
        }, {
            "Key": "Women",
            "Categories": [{
                "Key": "Clothes",
                "Categories": [{
                    "Key": "Ethenic"
                }, {
                    "Key": "Indo-Western"
                }, {
                    "Key": "Unstiched-Suits"
                }, {
                    "Key": "Kaftans"
                }]
            }, {
                "Key": "Jewellery",
                "Categories": [{
                    "Key": "Bangels"
                }, {
                    "Key": "Earings"
                }, {
                    "Key": "Necklace"
                }, {
                    "Key": "Pendents"
                }, {
                    "Key": "Bracelets"
                }]
            }]
        }],
        'dataLimit': 100
    }
    //mongod --dbpath D:\mongo\ data