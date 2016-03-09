'use strict';

var myApp = angular.module('myApp.importController', []);

myApp.controller('importController', ['$scope', '$linq', 'ngDialog', 'operationService', 'categoryService', 'importService', 'controllerBaseService',
    function($scope, $linq, ngDialog, operationService, categoryService, importService, controllerBaseService) {

        // Init field with default values (for preview)
        $scope.pastedText = "27/01/2016\nBENJAMIN TRANSFERT\nGift\nREFERENCE : 0190027600103001  \t\n\t13,00\n26/01/2016\nAMAZON BOOK FOR\nJEAN\nACCOUNT FR852005501005500451024E\nBUY ON AMZ\n\t-100,00\n";
        var defaultRegexJson = JSON.stringify('(([0-9]{2}\/[0-9]{2}\/[0-9]{4})[{\n}{\r}{\t} ]+([.{\n}{\r}{\t} a-zA-Z:0-9]*)[{\n}{\r}{\t} ]+[\t]?([\-]?[0-9 ]+\,[0-9]+))');
        $scope.regex = defaultRegexJson.substr(1, defaultRegexJson.length - 2);
        $scope.labels = 'date;label;amount';

        // Collapse/Accordion
        $scope.openInfo = true;

        controllerBaseService.initPagination($scope);
        controllerBaseService.initFilterBySign($scope, $linq, categoryService);
        controllerBaseService.initCategoryDialog($scope, ngDialog);
        controllerBaseService.initTypeaheadOnSelected($scope);
        controllerBaseService.invalidCachesOnConnection($scope);

        $scope.submit = function() {

            controllerBaseService.resetSubmitResult($scope);

            if ($scope.listOperations == null || $scope.listOperations.length == 0) {
                $scope.submitResultError = 'You must parse your text first!';
            }

            $scope.submitProcessing = 'Processing...';

            controllerBaseService.displaySubmitResult($scope, operationService.saveAll($scope.listOperations));
        };

        $scope.parseLabel = function(text, regexString) {
            var fieldNames = $scope.labels.split(';');
            importService.parseLabel(text, regexString, fieldNames).then(function(allOperations) {
                $scope.listOperations = allOperations;
            });
        }

        $scope.parseLabel($scope.pastedText, $scope.regex);
    }
]);
