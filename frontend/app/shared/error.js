var ErrorEventName = 'main-error';

angular.module('myApp.errorController', [])
    .component('error', {
        //templateUrl: '<h1>Hello {{ $ctrl.getFullName() }}</h1>',
        templateUrl: 'app/shared/error.html',
        controller: ['$scope', function($scope) {
            $scope.hasError = false;
            $scope.message = '';

            $scope.$on(ErrorEventName, function(event, profileObj) {
                if (profileObj.message) {
                    $scope.hasError = true;
                    $scope.message = profileObj.message;
                    $scope.details = profileObj.details;
                } else {
                    $scope.hasError = false;
                }
            });
        }]
    });
