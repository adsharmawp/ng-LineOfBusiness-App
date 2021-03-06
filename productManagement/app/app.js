﻿(function () {
    "use strict";
    var app = angular.module("productManagement", [
                                                    "common.services",
                                                    "ui.router",
                                                    "ui.mask",
                                                    "ui.bootstrap",
                                                    "angularCharts"
                                                    //,"productResourceMock"
                                                  ]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
            return function (exception, cause) {
                exception.message = "Please contact the Help Desk! \nMessage: " + exception.message;

                $delegate(exception, cause);
                alert(exception.message);
            };
        }])
    });

    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            // Home
            .state("home", {
                url: "/",
                templateUrl: "app/welcomeView.html"
            })
            // Products
            .state("productList", {
                url: "/products",
                templateUrl: "app/products/productList/productListView.html",
                controller: "ProductListCtrl as vm"
            })
            .state("productEdit", {
                abstract: true,
                url: "/product/edit/:id",
                templateUrl: "app/products/productEdit/productEditView.html",
                controller: "ProductEditCtrl as vm",
                resolve: {
                    productResource: "productResource",
                    product: function (productResource, $stateParams) {
                        var id = $stateParams.id;
                        return productResource.get({ id: id }, function (data) {
                            // no code needed for success in ui route resolve
                        }, function (response) {
                            var errorMsg = response.statusText + "\r\n";
                            if (response.data.exceptionMessage)
                                errorMsg += response.data.exceptionMessage;
                            alert(errorMsg);
                        }).$promise;
                    }
                }
            })
            .state("productEdit.info", {
                url: "/info",
                templateUrl: "app/products/productEdit/productEditInfoView.html"
            })
            .state("productEdit.price", {
                url: "/price",
                templateUrl: "app/products/productEdit/productEditPriceView.html"
            })
            .state("productEdit.tags", {
                url: "/tags",
                templateUrl: "app/products/productEdit/productEditTagsView.html"
            })
            .state("productDetail", {
                url: "/products/:id",
                templateUrl: "app/products/productDetail/productDetailView.html",
                controller: "ProductDetailCtrl as vm",
                resolve: {
                    productResource: "productResource",
                    product: function (productResource, $stateParams) {
                        var id = $stateParams.id;
                        return productResource.get({ id: id }, function (response) {
                            // no code needed for success
                        }, function (response) {
                            if (response.status == 404) {
                                alert("Error accessing resource: " + response.config.method + " " + response.config.url)
                            } else {
                                alert(response.statusText);
                            }
                        }).$promise;
                    }
                }
            })
            .state("priceAnalytics", {
                url: "/priceAnalytics",
                templateUrl: "app/prices/priceAnalyticsView.html",
                controller: "PriceAnalyticsCtrl",
                resolve: {
                    productResource: "productResource",
                    products: function (productResource) {
                        return productResource.query(function (response) {
                            // no code needed for success
                        }, function (response) {
                            if (response.status == 404) {
                                alert("Error accessing resource: " + response.config.method + " " + response.config.url)
                            } else {
                                alert(response.statusText);
                            }
                        }).$promise;
                    }
                }
            })
    }]);
}());