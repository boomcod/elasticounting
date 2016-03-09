var CategoryType = {
    Spending: "Spending",
    Income: "Income"
};
var Category = (function () {
    function Category() {
    }
    Category.prototype.isNew = function () {
        return !this.id;
    };
    Category.prototype.reset = function () {
        this.id = '';
        this.name = '';
        this.group = '';
        this.keywords = '';
        this.type = CategoryType.Spending;
    };
    Category.prototype.deepCopy = function () {
        return angular.copy(this);
    };
    ;
    Category.prototype.copyTo = function (destination) {
        angular.copy(this, destination);
    };
    ;
    return Category;
}());
var Operation = (function () {
    function Operation() {
    }
    Operation.prototype.isNew = function () {
        return !this.id;
    };
    Operation.prototype.reset = function () {
        this.id = '';
        this.date = new Date().toJSON().slice(0, 10);
        ;
        this.label = '';
        this.amount = 0;
        this.category = new Category();
        this.category.reset();
    };
    Operation.prototype.deepCopy = function () {
        return angular.copy(this);
    };
    ;
    Operation.prototype.copyTo = function (destination) {
        angular.copy(this, destination);
    };
    ;
    return Operation;
}());
//# sourceMappingURL=tsc.js.map