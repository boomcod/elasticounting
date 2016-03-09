var CategoryDialogHelper = {

    openDialog: function(dialog, operation, category) {
        return dialog.open({
                template: 'app/category/partials/categoryNewViewDialog.html',
                controller: 'categoryController',
                className: 'ngdialog-theme-plain custom-width',
                data: category
            })
            .closePromise
            .then(function(data) {
                if (!(data.value == '$escape') && !(data.value == '$closeButton') && !(data.value == '$document')) {

                    operation.category = category;
                }
            })
            .finally(function() {
                // Delete internal-use angular field
                delete operation.category.ngDialogId;
            });
    },

    openNewDialog: function(dialog, operation) {
        var category = new Category();
        operation.category.copyTo(category);

        category.reset();

        if (operation.category.amount > 0) {
            category.type = CategoryType.Income;
        }

        return this.openDialog(dialog, operation, category);
    },

    openEditDialog: function(dialog, operation) {
        var category = new Category();
        operation.category.copyTo(category);

        return this.openDialog(dialog, operation, category);
    }
};
