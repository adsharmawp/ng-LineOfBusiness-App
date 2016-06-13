(function () {
    "use strict";

    angular.module("productManagement")
           .controller("ProductEditCtrl", ["product", "$state", "productService", ProductEditCtrl]);

    function ProductEditCtrl(product, $state, productService) {
        var vm = this;

        vm.product = product;
        vm.originalProduct = angular.copy(vm.product);
        vm.priceOption = "percent";

        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost)
        }

        vm.calculatePrice = function () {
            var price = 0;
            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercent(vm.product.cost, vm.markupPercent);
            }
            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(vm.product.cost, vm.markupAmount);
            }
            vm.product.price = price;
        }

        if (vm.product && vm.product.id) {
            vm.title = "Edit: " + vm.product.productName;
        } else {
            vm.title = "New Product";
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };
        
        vm.submit = function (isValid) {
            if (isValid) {
                vm.product.productCode = vm.product.productCode.substring(0, 3) + "-" + vm.product.productCode.substring(3);
                if (vm.product.id) {
                    vm.product.$update({ id: vm.product.id }, function (data) {
                        vm.originalProduct = angular.copy(data);
                        toastr.success("Updated Successful")
                    }, function (response) {
                        var errorMsg = response.statusText + "\r\n";

                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                errorMsg += response.data.modelState[key] + "\r\n";
                            }
                        }

                        if (response.data.exceptionMessage) {
                            errorMsg += response.data.exceptionMessage;
                        }
                        alert(errorMsg);
                    });
                } else {
                    vm.product.$save(function (data) {
                        toastr.success("Saved Successful")
                    }, function (response) {

                        var errorMsg = response.statusText + "\r\n";

                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                errorMsg += response.data.modelState[key]+ "\r\n";
                            }
                            }

                        if (response.data.exceptionMessage) {
                            errorMsg += response.data.exceptionMessage;
                        }
                        alert(errorMsg);
                    });
                }
            } else {
                alert("Please correct the validation errors first.")
            }
        };

        vm.cancel = function () {
            $state.go("productList");
        };

        vm.reset = function (form) {
            vm.product = angular.copy(vm.originalProduct);
            form.$setPristine();
        };

        vm.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        }

        vm.removeTag = function (index) {
            vm.product.tags.splice(index, 1);
        }

        //errorHanlder = function (response) {

        //}
    }
}());