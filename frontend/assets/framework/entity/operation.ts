/// <reference path="../../../typings/browser/ambient/jquery/jquery.d.ts" />
/// <reference path="../../../typings/browser/ambient/angular/angular.d.ts" />

class Operation {

	id: string;
	date: string;
	label: string;
	amount: number;
	category: Category;

    constructor() {
    }

    isNew(): boolean {
		return !this.id;
    }

    reset(): void {
		this.id = '';
		this.date = new Date().toJSON().slice(0, 10);;
		this.label = '';
		this.amount = 0;
		this.category = new Category();
		this.category.reset();
    }

    deepCopy(): Operation {
        return angular.copy(this);
    };

    copyTo(destination: Operation): void {
        angular.copy(this, destination);
    };
}
