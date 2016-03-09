'use strict';

var myApp = angular.module("myApp.elasticsearchService", ["elasticsearch"]);

myApp.factory('esClient', ['esFactory', function(esFactory) {
    return esFactory({
        host: ElasticSearchConfig.host,
    });
}]);

myApp.service('elasticsearchService', ['esClient',
    function(esClient) {

        this.ping = function() {
            return esClient.ping({
                requestTimeout: 1000,
                hello: "elasticsearch"
            });
        };

        this.search = function(searchString) {
            return esClient.search({
                index: ElasticSearchConfig.baseIndex,
                q: searchString,
                size: ElasticSearchConfig.maxItemReturn
            });
        };

        this.save = function(type, id, element) {
            return esClient.create({
                index: ElasticSearchConfig.baseIndex,
                type: type,
                id: id,
                body: element
            });
        };

        this.delete = function(type, id) {
            return esClient.delete({
                index: ElasticSearchConfig.baseIndex,
                type: type,
                id: id,
            });
        };

        var createBulkBody = function(jsonDocs, type) {
            var bulkBody = [];

            angular.forEach(jsonDocs, function(jsonDoc, i) {
                var id = jsonDoc.date + jsonDoc.label.getHashCode() + jsonDoc.amount;
                bulkBody.push({
                    index: {
                        _index: ElasticSearchConfig.baseIndex,
                        _type: type,
                        _id: id
                    }
                });

                // Delete internal-use angular field
                delete jsonDoc.$$hashKey;

                jsonDoc.id = id;
                bulkBody.push(jsonDoc);
            });

            return bulkBody;
        };

        this.saveBulk = function(type, elements) {
            var jsonBulkBody = createBulkBody(elements, type);

            return esClient.bulk({
                body: jsonBulkBody
            });
        };
    }
]);
