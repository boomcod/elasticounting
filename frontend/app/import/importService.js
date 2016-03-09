var myApp = angular.module('myApp.importService', []);

myApp.service('importService', ['categoryService',
    function(categoryService) {

        var getCategoryFromKeywordsAndAmount = function(allCategories, fielValue, amount) {
            var categoryResult = new Category();
            categoryResult.reset();

            angular.forEach(allCategories, function(category, categoryIndex) {

                if ((amount > 0 && category.type == CategoryType.Income) || (amount < 0 && category.type == CategoryType.Spending)) {
                    if (category.keywords) {
                        var keywords = category.keywords.split('|');
                        angular.forEach(keywords, function(keyword, keywordIndex) {
                            if (keyword && fielValue.toLowerCase().contains(keyword)) {
                                categoryResult = category;
                            }
                        });
                    }
                }
            });
            return categoryResult;
        }

        this.parseLabel = function(text, regexString, fieldNames) {

            return categoryService.getAll().then(function(allCategories) {

                if (angular.isUndefined(text) || angular.isUndefined(regexString)) {
                    return [];
                }

                var jsonText = '';

                var regex = new RegExp(regexString, "ig");
                var match = regex.exec(text);
                var index = 2;

                while (match != null) {

                    var jsonTextLine = '';

                    var amount = 0;
                    var label = '';

                    angular.forEach(fieldNames, function(fieldName, fieldKey) {

                        var fielValue = '';

                        if (fieldName == "amount") {
                            amount = fielValue = match[index + fieldKey].replace(',', '.').replace(' ', '');
                        } else if (fieldName == "date") {
                            var st = "26.04.2013";
                            var patternDate = /(\d{2})\/(\d{2})\/(\d{4})/;

                            fielValue = '"' + match[index + fieldKey].replace(patternDate, '$3-$2-$1') + '"';
                        } else if (fieldName == "label") {
                            label = match[index + fieldKey].replace(/(?:\r\n|\r|\n|\t)/g, ' - ');
                            fielValue = '"' + label + '"';
                        }

                        jsonTextLine += '"' + fieldName + '" : ' + fielValue + ',';
                    });

                    jsonTextLine += '"category" : ' + JSON.stringify(getCategoryFromKeywordsAndAmount(allCategories, label, amount));
                    jsonText += '{' + jsonTextLine + '},';

                    match = regex.exec(text);
                }

                if (jsonText.length > 0) {
                    jsonText = jsonText.substr(0, jsonText.length - 1);
                }

                jsonText = '[' + jsonText + ']';
                return JSON.parse(jsonText);
            });
        }
    }
]);
