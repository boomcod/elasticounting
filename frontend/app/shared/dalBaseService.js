'use strict';

var myApp = angular.module('myApp.dalBaseService', []);

myApp.service('dalBaseService', ['elasticsearchService', '$q',
    function(elasticsearchService, $q) {

        this.save = function(list, element, index) {
            list.push(element);
            return elasticsearchService.save(index, element.id, element);
        }

        this.getAll = function(isPreloaded, list, index) {

            if (isPreloaded) {
                return $q.resolve(list);
            }

            return elasticsearchService.search('_type:' + index)
                .then(function(response) {

                    if (angular.isDefined(response)) {
                        var hits = response.hits.hits;
                        for (var i = 0; i < hits.length; i++) {
                            list.push(hits[i]._source);
                        }
                    }
                    return list;
                })
                .catch(function(error) {
                    return [];
                });

        };

        this.spliceElement = function(list, element) {

            var index = -1;
            for (var i = 0; i < list.length; i++) {
                if (element.id == list[i].id) {
                    index = i;
                }
            }

            list.splice(index, 1);
        };

        this.delete = function(list, element, index) {
            this.spliceElement(list, element);
            return elasticsearchService.delete(index, element.id)
        };
    }
]);
