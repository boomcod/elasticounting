'use strict';

var myApp = angular.module('myApp.categoryService', []);

myApp.service('categoryService', ['elasticsearchService', '$q', 'dalBaseService',
    function(elasticsearchService, $q, dalBaseService) {

        var indexName = 'categories';
        var categories = [];
        var isPreloaded = false;

        this.save = function(category) {

            // Delete internal-use angular field
            delete category.ngDialogId;

            if (!category.group) {
                return $q.reject('Category group can\'t be empty or null');
            }
            if (!category.name) {
                return $q.reject('Category name can\'t be empty or null');
            }

            if (!category.id) {
                category.id = category.type + category.group.getHashCode() + category.name.getHashCode();
            }

            category.keywords = category.keywords.toLowerCase();

            return dalBaseService.save(categories, category, indexName);
        };

        this.getAll = function() {
            return dalBaseService.getAll(isPreloaded, categories, indexName)
                .then(function(result) {
                    isPreloaded = true;
                    return $q.resolve(result);
                });
        };

        this.delete = function(category) {
            return dalBaseService.delete(categories, category, indexName);
        };

        this.invalidCache = function() {
            return isPreloaded = false;
        };
    }
]);
