'use strict';

var myApp = angular.module("myApp.controllerBaseService", []);

myApp.service('controllerBaseService', ['$q', 'categoryService', 'operationService',
    function($q, categoryService, operationService) {

        this.resetSubmitResult = function($scope) {
            $scope.submitProcessing = null;
            $scope.submitResultError = null;
            $scope.submitResult = null;
        };

        this.initPagination = function($scope) {
            $scope.currentPage = 1;
            $scope.pageSize = 20;
            $scope.predicate = 'group';
            $scope.reverse = false;
            $scope.order = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };
        };

        this.displaySubmitResult = function($scope, promise) {
            return promise
                .then(function(result) {
                    $scope.submitResult = result;
                    return $q.resolve();
                })
                .catch(function(error) {
                    $scope.submitResultError = error;
                    return $q.reject();
                })
                .finally(function(callback, notifyCallback) {
                    $scope.submitProcessing = null;
                });
        };

        this.submitSave = function($scope, elementService, element) {

            this.resetSubmitResult($scope);

            $scope.submitProcessing = 'Processing...';

            if (element.id) {
                return this.displaySubmitResult($scope,
                    elementService.delete(element)
                    .finally(function() {
                        return elementService.save(element);
                    }));
            } else {
                return this.displaySubmitResult($scope, elementService.save(element));
            }
        }

        this.initFilterBySign = function($scope, $linq, categoryService) {

            var allCategories = [];
            categoryService.getAll()
                .then(function(result) {
                    allCategories = result;
                });

            $scope.filterBySign = function(amount) {
                if (amount > 0)
                    return $linq.Enumerable().From(allCategories)
                        .Where(function(x) {
                            return x.type == CategoryType.Income
                        }).ToArray();
                else
                    return $linq.Enumerable().From(allCategories)
                        .Where(function(x) {
                            return x.type == CategoryType.Spending
                        }).ToArray();
            }
        };

        this.initCategoryDialog = function($scope, ngDialog) {

            $scope.openNewCategoryDialog = function(operation) {
                CategoryDialogHelper.openNewDialog(ngDialog, operation);
            };

            $scope.openEditCategoryDialog = function(operation) {
                CategoryDialogHelper.openEditDialog(ngDialog, operation);
            };
        };

        this.initTypeaheadOnSelected = function($scope) {
            $scope.typeaheadOnSelected = function($item, $model, $label) {
                this.operation.category = $item;
            };
        };

        var isConnected = false;

        this.invalidCachesOnConnection = function($scope) {
            $scope.$on(ErrorEventName, function(event, profileObj) {
                if (profileObj.message) {
                    isConnected = false;
                } else {
                    if (isConnected == false) {
                        isConnected = true;

                        categoryService.invalidCache();
                        operationService.invalidCache();
                    }
                }
            });
        }
    }
]);
