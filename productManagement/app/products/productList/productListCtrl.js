(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductListCtrl", ["productResource", "currentUser", ProductListCtrl]);

    function ProductListCtrl(productResource, currentUser) {
        var vm = this;

        productResource.query(function (data) {
            vm.products = data;
        });

        vm.showImage = false;

        vm.toggleShowImg = function () {
            vm.showImage = !vm.showImage;
        }

        vm.deleteProduct = function() {
            alert(currentUser.getProfile().token);
        }
    }
}());