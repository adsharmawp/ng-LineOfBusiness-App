﻿(function () {
    "use strict";

    // .run : to perform the initialization
    angular
        .module("productResourceMock", ["ngMockE2E"])
        .run(function ($httpBackend) {
            var products = [
            {
                "productId": 1,
                "productName": "Mock Leaf Rake",
                "productCode": "GDN-0011",
                "releaseDate": "March 19, 2009",
                "description": "Leaf rake with 48-inch wooden handle.",
                "cost": 9.00,
                "price": 19.95,
                "category": "garden",
                "tags": ["leaf", "tool"],
                "imageUrl": "images/Leaf-Rake.png"
            },
            {
                "productId": 2,
                "productName": "Garden Cart",
                "productCode": "GDN-0023",
                "releaseDate": "March 18, 2010",
                "description": "15 gallon capacity rolling garden cart",
                "cost": 20.00,
                "price": 32.99,
                "category": "garden",
                "tags": ["barrow", "cart", "wheelbarrow"],
                "imageUrl": "images/garden-cart.png"
            },
            {
                "productId": 5,
                "productName": "Hammer",
                "productCode": "TBX-0048",
                "releaseDate": "May 21, 2013",
                "description": "Curved claw steel hammer",
                "cost": 1.00,
                "price": 8.99,
                "category": "toolbox",
                "tags": ["tool"],
                "imageUrl": "images/rejon-Hammer.png"
            },
            {
                "productId": 8,
                "productName": "Saw",
                "productCode": "TBX-0022",
                "releaseDate": "May 15, 2009",
                "description": "15-inch steel blade hand saw",
                "cost": 6.95,
                "price": 11.55,
                "category": "garden",
                "tags": ["garden", "mower"],
                "imageUrl": "images/egore911-saw.png"
            },
            {
                "productId": 10,
                "productName": "Video Game Controller",
                "productCode": "GMG-0042",
                "releaseDate": "October 15, 2002",
                "description": "Standard two-button video game controller",
                "cost": 2.22,
                "price": 35.95,
                "category": "gaming",
                "tags": ["gaming", "controller", "video game"],
                "imageUrl": "images/xbox-controller-01.png"
            }
            ];

            var productUrl = "http://localhost:62336/api/products";

            $httpBackend.whenGET(productUrl).respond(products);

            var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
            $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
                var product = {"productId": 0};
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length-1];
                
                if(id > 0){
                    for (var i = 0; i < products.length; i++) {
                        if(products[i].productId == id){
                            product = products[i];
                            break;
                        }
                    }
                }

                return [200, product, {}];
            });

            $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
                var product = angular.fromJson(data);

                if (!product.productId) {
                    // new product Id
                    product.productId = products[products.length - 1].productId + 1;
                    products.push(product);
                } else {
                    // update product
                    for (var i = 0; i < products.length; i++) {
                        if (products[i].productId == product.productId) {
                            products[i] = product;
                        }
                    }
                }
                return [200, product, {}];
            });

            // Pass through any requests for application files
            $httpBackend.whenGET(/app/).passThrough();
        });
    
        
}());