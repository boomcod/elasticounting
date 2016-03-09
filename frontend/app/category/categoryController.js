'use strict';

var myApp = angular.module('myApp.categoryController', []);

myApp.controller('categoryController', ['$scope', 'categoryService', 'controllerBaseService',
    function($scope, categoryService, controllerBaseService) {

        $scope.reset = function() {
            $scope.category = new Category();
            $scope.category.reset();

            controllerBaseService.resetSubmitResult($scope);
        };

        function init() {

            categoryService.getAll()
                .then(function(result) {
                    $scope.listCategories = $scope.filteredData = result;
                });

            controllerBaseService.initPagination($scope);

            $scope.reset();
        };

        init();
        controllerBaseService.invalidCachesOnConnection($scope);

        $scope.edit = function(category) {
            $scope.category = category;
            return false;
        };

        $scope.delete = function(category) {

            controllerBaseService.displaySubmitResult($scope, categoryService.delete(category));

            init();
            return false;
        };

        $scope.submitSave = function(category) {
            controllerBaseService.submitSave($scope, categoryService, category).then(function() {
                $scope.closeThisDialog();
            });
        };
    }
]);
