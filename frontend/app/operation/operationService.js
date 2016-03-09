'use strict';

var myApp = angular.module('myApp.operationService', []);

myApp.service('operationService', ['elasticsearchService', '$q', 'dalBaseService',
    function(elasticsearchService, $q, dalBaseService) {

        var indexName = 'operations';
        var operations = [];
        var isPreloaded = false;

        this.save = function(operation) {

            if (!operation.date) {
                return $q.reject('Operation date can\'t be empty or null');
            }
            if (!operation.label) {
                return $q.reject('Operation label can\'t be empty or null');
            }
            if (!operation.amount) {
                return $q.reject('Operation amount can\'t be empty or null');
            }

            if (!operation.id) {
                operation.id = operation.date + operation.label.getHashCode() + operation.amount;
            }

            return dalBaseService.save(operations, operation, indexName);
        };

        this.saveAll = function(listOperations) {

            return elasticsearchService.saveBulk(indexName, listOperations)
                .then(function(result) {
                    return $q.resolve(result);
                })
                .finally(function() {
                    operations = [];
                    isPreloaded = false;
                });
        };

        this.getAll = function() {
            return dalBaseService.getAll(isPreloaded, operations, indexName)
                .then(function(result) {
                    isPreloaded = true;
                    return $q.resolve(result);
                });
        };

        this.delete = function(operation) {
            return dalBaseService.delete(operations, operation, indexName);
        };

        this.invalidCache = function() {
            return isPreloaded = false;
        };
    }
]);
