'use strict';

var myApp = angular.module('myApp', [
    // Angular + plugins
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'angular-linq',
    'ngDialog',
    'ngAnimate',
    'ngMessages',

    // Shared/External services
    'myApp.elasticsearchService',
    'myApp.controllerBaseService',
    'myApp.dalBaseService',

    // Business controllers/services
    'myApp.importService',
    'myApp.importController',
    'myApp.categoryService',
    'myApp.categoryController',
    'myApp.operationService',
    'myApp.operationController',
    'myApp.errorController'
]);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/homeView.html',
        })
        .when('/import', {
            templateUrl: 'app/import/importView.html',
            controller: 'importController'
        })
        .when('/categories', {
            templateUrl: 'app/category/categoryListView.html',
            controller: 'categoryController'
        })
        .when('/operations', {
            templateUrl: 'app/operation/operationListView.html',
            controller: 'operationController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

/// <summary>
/// We ping Elasticsearch on each route change:
/// 	- If failed: we notice to user
/// 	- If success: we clean notification
/// </summary>
myApp.run(function($rootScope, elasticsearchService) {
    $rootScope.$on('$routeChangeStart', function(angularEvent, next, current) {

        elasticsearchService.ping()
            .then(function(resp) {
                $rootScope.$broadcast(ErrorEventName, {
                    message: '',
                    details: ''
                });
            })
            .catch(function(error) {
                var message = 'ElasticSearch is unavailable at: ' + ElasticSearchConfig.host;
                var details = error;

                $rootScope.$broadcast(ErrorEventName, {
                    message: message,
                    details: details
                });
            });
    });
});
