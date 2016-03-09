'use strict';

var myApp = angular.module('myApp.operationController', []);

myApp.controller('operationController', ['$scope', '$linq', 'ngDialog', 'operationService', 'categoryService', 'controllerBaseService',
    function($scope, $linq, ngDialog, operationService, categoryService, controllerBaseService) {

        $scope.reset = function() {
            $scope.operation = new Operation();
            $scope.operation.reset();

            controllerBaseService.resetSubmitResult($scope);
        };

        function init() {
            operationService.getAll()
                .then(function(result) {
                    $scope.listOperations = $scope.filteredData = result;
                });

            controllerBaseService.initPagination($scope);
            $scope.reset();
        };

        init();

        controllerBaseService.initFilterBySign($scope, $linq, categoryService);
        controllerBaseService.initCategoryDialog($scope, ngDialog);
        controllerBaseService.initTypeaheadOnSelected($scope);
        DatePickerHelper.initForController($scope);
        controllerBaseService.invalidCachesOnConnection($scope);

        $scope.edit = function(operation) {
            operation.copyTo($scope.operation);
            $scope.dt = new Date($scope.operation.date);
            return false;
        };

        $scope.delete = function(operation) {
            controllerBaseService.displaySubmitResult($scope, operationService.delete(operation));

            init();
            return false;
        };

        $scope.submitSave = function(operationJsObject) {
            controllerBaseService.resetSubmitResult($scope);

            $scope.submitProcessing = 'Processing...';

            var operation = new Operation();
            operationJsObject.copyTo(operation);

            if (!operation.isNew()) {
                controllerBaseService.displaySubmitResult($scope, operationService.delete(operation)
                    .then(function(result) {
                        controllerBaseService.displaySubmitResult($scope, operationService.save(operation));
                    }));
            } else {
                controllerBaseService.displaySubmitResult($scope, operationService.save(operation));
            }

            init();
            return true;
        };
    }
]);
